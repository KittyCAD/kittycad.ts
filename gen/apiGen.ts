import fsp from 'node:fs/promises'
import pkg from 'fast-json-patch'
import Handlebars from 'handlebars'
import type { OpenAPIV3 } from 'openapi-types'
import { format } from 'prettier'
import {
  expectedToTimeout,
  operationsToNotGenerateTestsFor,
  testsExpectedToThrow,
  toTestPathString,
} from './expectedToFail.js'
const { observe, generate } = pkg

export default async function apiGen(lookup: Record<string, string>) {
  const spec: OpenAPIV3.Document = JSON.parse(
    await fsp.readFile('./spec.json', 'utf8')
  )
  const observer = observe(spec)
  const tags = spec.tags

  // Use fs.rm over deprecated fs.rmdir({ recursive: true }) to be compatible
  // with Node.js >= 22 and future removals of the recursive rmdir option.
  await fsp.rm('./src/api', { recursive: true, force: true })
  await fsp.rm('./__tests__/gen', { recursive: true, force: true })

  await fsp.mkdir(`./src/api`)
  await fsp.mkdir(`./__tests__/gen`)
  await Promise.allSettled(
    tags.map(({ name }) => fsp.mkdir(`./src/api/${name}`))
  )
  const operationIds: string[] = []
  const operations: {
    [key: string]: {
      specSection: OpenAPIV3.PathItemObject['post' | 'get' | 'put' | 'delete']
      path: string
      method: string
    }
  } = {}
  Object.entries(spec.paths).forEach(([path, pathValue]) => {
    Object.entries(pathValue).forEach(([method, _methodValue]) => {
      const methodValue = _methodValue as OpenAPIV3.PathItemObject[
        | 'post'
        | 'get'
        | 'put'
        | 'delete']
      const operationId = (methodValue as any).operationId
      if (!operationId) {
        throw `no operationId for ${path} ${method}`
      }
      operations[operationId] = {
        path,
        method,
        specSection: methodValue,
      }
      operationIds.push(operationId)
    })
  })
  const indexFile: {
    [tag: string]: {
      importsStr: string[]
      exportsStr: string[]
    }
  } = {}
  const writePromises = Object.entries(operations).map(
    async ([operationId, operation]) => {
      try {
        if ('hidden' === (operation.specSection as any).tags[0]) {
          return []
        }

        const isWebSocket = Boolean(
          (operation.specSection as any)['x-dropshot-websocket']
        )
        const exampleTplPath = isWebSocket
          ? './gen/templates/exampleWs.hbs'
          : './gen/templates/exampleRest.hbs'
        let exampleTemplate = ''

        const templatePath = isWebSocket
          ? './gen/templates/ws.hbs'
          : (operation.specSection?.requestBody as any)?.content?.[
                'multipart/form-data'
              ]?.schema
            ? './gen/templates/multipart.hbs'
            : './gen/templates/rest.hbs'

        const inputTypes: string[] = ['client?: Client']
        const inputParams: string[] = ['client']
        const paramTypeMap: Record<string, string> = { client: 'Client' }
        const paramRequiredMap: Record<string, boolean> = { client: false }
        const inputParamsExamples: string[] = []
        if (isWebSocket) {
          inputParamsExamples.push(
            `client: new Client(process.env.KITTYCAD_TOKEN)`
          )
        }

        const isMultipart = Boolean(
          (operation.specSection?.requestBody as any)?.content?.[
            'multipart/form-data'
          ]
        )
        if (isMultipart) {
          inputParams.push('files')
          inputTypes.push('files: File[]')
          paramTypeMap['files'] = 'File[]'
          paramRequiredMap['files'] = true
          inputParamsExamples.push(
            `files: [{name: "thing.kcl", data: new Blob(['thing = 1'], {type: 'text/plain'})}]`
          )
        }
        let needsFsImport = false

        const importedParamTypes: string[] = []
        const path = operation.path
        const params = operation.specSection
          .parameters as OpenAPIV3.ParameterObject[]
        // 'template' holds the generated API source for this operation
        // (REST, multipart, or websocket) after Handlebars rendering.
        let urlPathParams: string[] = path.split('/')
        const urlQueryParams: string[] = []
        const urlQueryParamNames: string[] = []
        ;(params || []).forEach(({ name, in: _in, schema, required }) => {
          let _type = 'unknown'
          if ('$ref' in schema) {
            const ref = schema.$ref
            _type = lookup[ref]
            importedParamTypes.push(_type)
            const refName = ref.split('/').pop() as string
            const reffedSchemaRaw = spec.components.schemas[refName] as
              | OpenAPIV3.ReferenceObject
              | OpenAPIV3.SchemaObject
            if ('$ref' in reffedSchemaRaw) {
              // Nested $ref not expected; fallback to 'unknown'.
              _type = 'unknown'
            } else {
              const reffedSchema = reffedSchemaRaw as OpenAPIV3.SchemaObject
              if (reffedSchema.type === 'string' && reffedSchema.enum) {
                if (operationId.includes('file') && name === 'src_format') {
                  const input =
                    reffedSchema.enum.find((fmt) => fmt === 'obj') ||
                    reffedSchema.enum.find((fmt) => fmt === 'svg')
                  inputParamsExamples.push(`${name}: '${input}'`)
                } else if (name === 'output_format') {
                  inputParamsExamples.push(`${name}: '${reffedSchema.enum[0]}'`)
                } else {
                  inputParamsExamples.push(`${name}: '${reffedSchema.enum[1]}'`)
                }
              } else if (reffedSchema.oneOf) {
                const isOutput = ['output_unit', 'output_format'].includes(name)
                const input = (reffedSchema.oneOf?.find(
                  (_input: OpenAPIV3.SchemaObject) =>
                    (_input?.enum?.[0] === 'obj' && !isOutput) ||
                    _input?.enum?.[0] === 'svg' ||
                    _input?.enum?.[0] === 'stl'
                ) ||
                  reffedSchema.oneOf?.[
                    isOutput ? 1 : 0
                  ]) as OpenAPIV3.SchemaObject
                inputParamsExamples.push(`${name}: '${input?.enum?.[0]}'`)
              } else if (
                reffedSchema.type === 'string' &&
                reffedSchema.format === 'uuid'
              ) {
                inputParamsExamples.push(
                  `${name}: '${'00000000-0000-0000-0000-000000000000'}'`
                )
              } else if (
                reffedSchema.type === 'string' &&
                refName == 'ServiceAccountUuid'
              ) {
                inputParamsExamples.push(
                  `${name}: '${'svc-00000000-0000-0000-0000-000000000000'}'`
                )
              } else if (
                reffedSchema.type === 'string' &&
                refName == 'SessionUuid'
              ) {
                inputParamsExamples.push(
                  `${name}: '${'ses-00000000-0000-0000-0000-000000000000'}'`
                )
              } else if (
                reffedSchema.type === 'string' &&
                refName == 'ApiTokenUuid'
              ) {
                inputParamsExamples.push(
                  `${name}: '${'api-00000000-0000-0000-0000-000000000000'}'`
                )
              } else if (
                reffedSchema.type === 'string' &&
                refName == 'DeviceAccessTokenUuid'
              ) {
                inputParamsExamples.push(
                  `${name}: '${'dev-00000000-0000-0000-0000-000000000000'}'`
                )
              } else if (
                reffedSchema.type === 'string' &&
                refName == 'UserIdentifier'
              ) {
                inputParamsExamples.push(`${name}: '${'31337'}'`)
              } else if (
                reffedSchema.type === 'string' &&
                refName == 'CodeLanguage'
              ) {
                inputParamsExamples.push(`${name}: '${'node'}'`)
              }
            }
          } else {
            if (schema.type === 'number' || schema.type === 'integer') {
              _type = 'number'
              inputParamsExamples.push(`${name}: ${7}`)
            } else if (schema.type === 'string' || schema.type === 'boolean') {
              inputParamsExamples.push(
                `${name}: ${schema.type === 'string' ? "'string'" : 'true'}`
              )
              _type = schema.type
            }
          }
          // Path params are always required; others follow the spec's required flag
          const isPath = _in === 'path'
          const isRequired = isPath || !!required
          inputTypes.push(`${name}${isRequired ? '' : '?'}: ${_type}`)
          paramTypeMap[name] = _type
          paramRequiredMap[name] = isRequired
          if (!name) {
            return
          }
          inputParams.push(name)
          if (_in === 'path') {
            urlPathParams = urlPathParams.map((p) => {
              if (p === `{${name}}`) {
                return `\${${name}}`
              }
              return p
            })
          } else {
            urlQueryParams.push(`${name}=\${${name}}`)
            urlQueryParamNames.push(name)
          }
        })
        const templateUrlOnlyPath = wrapInBacktics(`${urlPathParams.join('/')}`)
        const queryObjectExpr = `{ ${urlQueryParamNames
          .map((n) => `${n}: ${n}`)
          .join(', ')} }`
        const requestBodyRaw = operation.specSection?.requestBody as
          | OpenAPIV3.RequestBodyObject
          | OpenAPIV3.ReferenceObject
          | undefined
        const requestBody =
          requestBodyRaw && '$ref' in requestBodyRaw
            ? undefined
            : (requestBodyRaw as OpenAPIV3.RequestBodyObject | undefined)

        const contentType = !isWebSocket
          ? (() => {
              if (isMultipart) return 'multipart/form-data'
              const ct = requestBody?.content || {}
              if ('application/json' in ct) return 'application/json'
              if ('application/x-www-form-urlencoded' in ct)
                return 'application/x-www-form-urlencoded'
              return (Object.keys(ct)[0] || 'text/plain').replaceAll(' ', '')
            })()
          : ''

        const jsonSchema = requestBody?.content?.['application/json']?.schema
        const urlEncodedSchema =
          requestBody?.content?.['application/x-www-form-urlencoded']?.schema
        let bodyTypeName: string | undefined
        let bodyIsRequired = false
        const formSchema = requestBody?.content?.['multipart/form-data']?.schema
        if (
          (!isWebSocket && jsonSchema && '$ref' in jsonSchema) ||
          (formSchema && '$ref' in formSchema) ||
          (urlEncodedSchema && '$ref' in urlEncodedSchema)
        ) {
          const schemaRef =
            formSchema && '$ref' in formSchema
              ? formSchema.$ref
              : jsonSchema && '$ref' in jsonSchema
                ? (jsonSchema as OpenAPIV3.ReferenceObject).$ref
                : (urlEncodedSchema as OpenAPIV3.ReferenceObject).$ref
          const ref = schemaRef
          const typeReference = lookup[ref]
          importedParamTypes.push(typeReference)
          inputTypes.push(`body: ${typeReference}`)
          inputParams.push('body')
          paramTypeMap['body'] = typeReference
          bodyTypeName = typeReference
          bodyIsRequired = !!(requestBody as OpenAPIV3.RequestBodyObject)
            ?.required
          paramRequiredMap['body'] = bodyIsRequired

          const mapOverProperties = (rawRef: string): string => {
            const refSchema = spec.components.schemas[
              rawRef.split('/').pop()
            ] as OpenAPIV3.SchemaObject
            const returnExample = (
              refSchema: OpenAPIV3.SchemaObject
            ): string => {
              if ('type' in refSchema && !refSchema.properties) {
                if (refSchema.type === 'string') {
                  return `"${
                    refSchema.description.replaceAll('"', ',') || 'string'
                  }"`
                }
                if (refSchema.type === 'number') {
                  return `7`
                }
                if (refSchema.type === 'boolean') {
                  return `true`
                }
              }
              if ('oneOf' in refSchema) {
                const oneOf = refSchema.oneOf
                if ('enum' in oneOf[0]) {
                  return `'${oneOf[0].enum[0]}'`
                } else if ('type' in oneOf[0]) {
                  return returnExample(oneOf[0])
                }
              }
              if (!refSchema.properties) {
                return ''
              }
              const requiredProperties = Object.entries(refSchema.properties)
              if (!requiredProperties.length) {
                return ''
              }
              return `{${requiredProperties
                .map(([key, value]) => {
                  if ('$ref' in value) {
                    // TODO
                    return ''
                  }
                  // Handle object properties, including index signatures
                  if (
                    (value as any).type === 'object' &&
                    'additionalProperties' in (value as any)
                  ) {
                    const addProps = (value as any)
                      .additionalProperties as OpenAPIV3.SchemaObject
                    // If the index signature is strings, provide a minimal example
                    if ((addProps as any).type === 'string') {
                      return `${key}: {}`
                    }
                    // Fallback to an empty object for other cases
                    return `${key}: {}`
                  }
                  if (value.type === 'string' && 'enum' in value) {
                    return `${key}: '${value.enum[0]}'`
                  }
                  if (value.type === 'string') {
                    return `${key}: "${
                      (value.description || '').replaceAll('"', "'") || 'string'
                    }"`
                  }
                  if (value.type === 'number' || value.type === 'integer') {
                    return `${key}: 7`
                  }
                  if (value.type === 'boolean') {
                    return `${key}: true`
                  }
                  if (
                    'allOf' in value &&
                    value.allOf.length === 1 &&
                    '$ref' in value.allOf[0]
                  ) {
                    const ref = value.allOf[0].$ref
                    return `${key}: ${mapOverProperties(ref)}`
                  }
                  if (
                    value.type === 'array' &&
                    'type' in value.items &&
                    value.items.type === 'string'
                  ) {
                    return `${key}: ['string']`
                  }
                  if (value.type === 'array' && '$ref' in value.items) {
                    // assuming text to cad iteration for now
                    return `${key}: []`
                  }
                  if (value.type === 'object') {
                    // generic nested object; provide minimal example
                    return `${key}: {}`
                  }
                  return ''
                })
                .filter(Boolean)
                .join(', ')}}`
            }
            return returnExample(refSchema)
          }

          const theStr = mapOverProperties(ref)
          if (theStr) {
            inputParamsExamples.push(`body: ${theStr}`)
          }

          // JSON body will be included via the Handlebars template context.
        } else if (
          !isWebSocket &&
          requestBody?.content?.['application/octet-stream']
        ) {
          const octetSchema = requestBody.content['application/octet-stream']
            .schema as OpenAPIV3.SchemaObject
          if (octetSchema?.type !== 'string') {
            // Fallback to string body
          }
          inputTypes.push('body: string')
          inputParams.push('body')
          paramTypeMap['body'] = 'string'
          bodyTypeName = 'string'
          bodyIsRequired = !!(requestBody as OpenAPIV3.RequestBodyObject)
            ?.required
          paramRequiredMap['body'] = bodyIsRequired

          let exampleFile = 'example'

          // For requests depending on a model file
          const modelFmts = inputParamsExamples.find((str) => {
            return str.startsWith('src_format:')
          })
          if (modelFmts) {
            exampleFile = modelFmts.includes('obj')
              ? 'example.obj'
              : 'example.svg'
          }

          // For requests depending on a source code file
          const langFmts = inputParamsExamples.find((str) => {
            return str.startsWith('lang:')
          })
          if (langFmts) {
            exampleFile = `example.${langFmts.replace(
              /lang: '([a-z]+)'/,
              '$1'
            )}`
          }

          inputParamsExamples.push(
            `body: await fsp.readFile('./${exampleFile}', 'base64')`
          )
          needsFsImport = true
          // Binary body will be included via the Handlebars template context.
        } else {
          // No body content; nothing to add to context.
        }

        // No-op: Handlebars template handles optional params signature.
        const importedTypes: string[] = []
        let pagerItemTypeName: string | undefined
        if (!isWebSocket) {
          Object.values(operation.specSection?.responses).forEach(
            (response) => {
              const schema = (response as any)?.content?.['application/json']
                ?.schema as OpenAPIV3.SchemaObject
              if (!schema) {
                let ref = (response as any)?.$ref || ''
                ref = ref.replace('responses', 'schemas')
                const typeReference = lookup[ref]

                if (
                  typeReference &&
                  typeReference !== 'Error' &&
                  !importedTypes.includes(typeReference)
                ) {
                  importedTypes.push(typeReference)
                }
              } else if (
                (response as any)?.content['application/json']?.schema?.$ref
              ) {
                const ref = (response as any)?.content['application/json']
                  ?.schema?.$ref
                const typeReference = lookup[ref]
                if (
                  typeReference &&
                  typeReference !== 'Error' &&
                  !importedTypes.includes(typeReference)
                ) {
                  importedTypes.push(typeReference)
                }
                try {
                  const refName = (ref || '').split('/').pop() as string
                  if (refName?.endsWith('ResultsPage')) {
                    const pageSchema = spec.components.schemas[
                      refName
                    ] as OpenAPIV3.SchemaObject
                    const itemsSchemaRaw = (pageSchema?.properties as any)
                      ?.items
                    if (itemsSchemaRaw) {
                      if ('$ref' in (itemsSchemaRaw as any)) {
                        pagerItemTypeName =
                          lookup[
                            (itemsSchemaRaw as OpenAPIV3.ReferenceObject).$ref
                          ]
                      } else {
                        const asSchema =
                          itemsSchemaRaw as OpenAPIV3.SchemaObject
                        if (isArraySchema(asSchema)) {
                          const it = asSchema.items as
                            | OpenAPIV3.ReferenceObject
                            | OpenAPIV3.SchemaObject
                          if ('$ref' in (it as any)) {
                            pagerItemTypeName =
                              lookup[(it as OpenAPIV3.ReferenceObject).$ref]
                          }
                        }
                      }
                    }
                  }
                } catch {}
              } else if (
                Object.keys(schema).length === 0 ||
                schema.type === 'string'
              ) {
                // do nothing
              } else if (schema.type === 'array') {
                const items = schema.items as OpenAPIV3.SchemaObject
                if ((items as any).$ref) {
                  const typeReference = lookup[(items as any).$ref]
                  if (
                    typeReference &&
                    typeReference !== 'Error' &&
                    !importedTypes.includes(typeReference + '[]')
                  ) {
                    importedTypes.push(typeReference + '[]')
                  }
                } else if (items.type === 'string') {
                  // do nothing
                } else {
                  // Fallback: accept unknown[] for unhandled array response shapes
                  importedTypes.push('unknown[]')
                }
              } else if (
                schema.type === 'object' &&
                'additionalProperties' in schema
              ) {
                schema.additionalProperties
                const addProps =
                  schema.additionalProperties as OpenAPIV3.SchemaObject
                if (addProps.type === 'array' && '$ref' in addProps.items) {
                  const typeReference = lookup[addProps.items.$ref]
                  if (
                    typeReference &&
                    typeReference !== 'Error' &&
                    !importedTypes.includes(typeReference + '[]')
                  ) {
                    importedTypes.push(typeReference + '[]')
                  }
                }
              } else {
                // Fallback: accept unknown for unhandled response shapes
                importedTypes.push('unknown')
              }
            }
          )
        }

        // Render with Handlebars
        const render = async (path: string, ctx: Record<string, unknown>) => {
          const raw = await fsp.readFile(path, 'utf8')
          // Debug: if rendering example templates, ensure we see the correct version
          if (path.includes('example')) {
            // eslint-disable-next-line no-console
            console.log(
              'rendering',
              path,
              'preview:',
              raw.split('\n').slice(0, 3)
            )
          }
          const tpl = Handlebars.compile(raw)
          return tpl(ctx)
        }

        let template = ''
        if (!isWebSocket) {
          const pascalName = toPascalCase(operationId)
          const has204 = Object.prototype.hasOwnProperty.call(
            operation.specSection?.responses || {},
            '204'
          )
          const returnTyping = `type ${pascalName}Return = ${
            has204
              ? 'void'
              : importedTypes.length
                ? importedTypes.join(' | ')
                : 'unknown'
          }`
          const paramsInterfaceName = `${pascalName}Input`
          const returnTypeName = `${pascalName}Return`
          const paramsInterface = `interface ${paramsInterfaceName} { ${inputTypes.join(
            '; '
          )} }`
          let paramsSignature = `{${inputParams
            .filter((a) => a)
            .join(', ')}}: ${paramsInterfaceName}`
          if (inputParams.filter(Boolean).length === 1) {
            paramsSignature += ` = {} as ${paramsInterfaceName}`
          }
          const importsModels = `import {${[
            ...new Set([
              ...importedTypes,
              ...importedParamTypes,
              ...(pagerItemTypeName ? [pagerItemTypeName] : []),
            ]),
          ]
            .map((a) => (a || '').replaceAll('[', '').replaceAll(']', ''))
            .join(', ')}} from '../../models.js';`
          let bodyLine = ''
          const methodUpper = operation.method.toUpperCase()
          const allowBody = !['GET', 'DELETE'].includes(methodUpper)
          if (allowBody && requestBody?.content?.['application/json'])
            bodyLine = 'body: JSON.stringify(body)'
          if (allowBody && requestBody?.content?.['application/octet-stream'])
            bodyLine = 'body'
          if (
            allowBody &&
            requestBody?.content?.['application/x-www-form-urlencoded']
          )
            bodyLine =
              'body: buildForm(body as unknown as Record<string, unknown>)'
          const ctx = {
            importsModels,
            paramsInterface,
            paramsInterfaceName,
            returnType: returnTyping,
            returnTypeName,
            functionName: operationId,
            paramsSignature,
            urlPathExpr: templateUrlOnlyPath,
            queryObjectExpr,
            httpMethod: methodUpper,
            contentType,
            omitContentType: isMultipart || bodyLine === '',
            bodyLine,
            multipartAppendBody: inputParams.includes('body')
              ? "formData.append('event', JSON.stringify(body))"
              : '',
            fnJsDoc: buildOperationJsDoc(operation.specSection, {
              operationId,
              params: params,
              isMultipart,
              hasBody: inputParams.includes('body'),
              paramTypeMap,
              paramRequiredMap,
              bodyTypeName,
              returnTypeName,
              importedReturnTypes: importedTypes,
            }),
            noJsonResponse: has204,
            pager: Boolean(pagerItemTypeName),
            pagerItemTypeName: pagerItemTypeName || 'unknown',
            pagerFnName: `${operationId}_pager`,
            isUrlEncoded: contentType === 'application/x-www-form-urlencoded',
          }
          template = await render(templatePath, ctx)
        } else {
          // Collect WS request/response types for the template context.
          let wsReqType = 'unknown'
          let wsRespType = 'unknown'
          const reqSchema = (
            requestBody as OpenAPIV3.RequestBodyObject | undefined
          )?.content?.['application/json']?.schema
          if (isRef(reqSchema)) {
            wsReqType = lookup[reqSchema.$ref]
            importedTypes.push(wsReqType)
          }
          const wsDefaultResp = (operation.specSection?.responses as any)?.[
            'default'
          ]
          const respSchema = wsDefaultResp?.content?.['application/json']
            ?.schema as
            | OpenAPIV3.ReferenceObject
            | OpenAPIV3.SchemaObject
            | undefined
          if (isRef(respSchema)) {
            wsRespType = lookup[respSchema.$ref]
            importedTypes.push(wsRespType)
          }
          const className = toWsClassName(operationId)
          const paramsName = `${className}Params`
          const importsModels = `import {${[
            ...new Set([...importedParamTypes, ...importedTypes]),
          ]
            .map((a) => (a || '').replaceAll('[', '').replaceAll(']', ''))
            .join(', ')}} from '../../models.js';`
          const paramsFields = inputTypes.join('; ')
          const wsUrlPathExpr = templateUrlOnlyPath.replaceAll(
            '${',
            '${this.functionNameParams.'
          )
          const wsQueryObjectExpr = `{ ${urlQueryParamNames
            .map((n) => `${n}: this.functionNameParams.${n}`)
            .join(', ')} }`
          const ctx = {
            importsModels,
            className,
            paramsInterfaceName: paramsName,
            paramsFields,
            urlPathExpr: wsUrlPathExpr,
            queryObjectExpr: wsQueryObjectExpr,
            wsReqType: wsReqType || 'unknown',
            wsRespType: wsRespType || 'unknown',
            fnJsDoc: buildWsJsDoc(operation.specSection, {
              operationId,
              params: params,
              paramTypeMap,
              paramRequiredMap,
            }),
          }
          template = await render(templatePath, ctx)
        }

        const tag = operation.specSection?.tags?.[0] || 'err'
        const safeTag = tag.replaceAll('-', '_')
        {
          const paramsStr = inputParamsExamples.filter((a) => a).join(', ')
          const hasParams = Boolean(paramsStr)
          const expectThrow =
            !isWebSocket &&
            testsExpectedToThrow.includes(toTestPathString(tag, operationId))
          // Prefer explicit throw assertions over timeout when both are listed
          const expectTimeout =
            !isWebSocket &&
            !expectThrow &&
            expectedToTimeout.includes(toTestPathString(tag, operationId))
          exampleTemplate = await render(exampleTplPath, {
            tag: safeTag,
            operationId,
            params: paramsStr,
            hasParams,
            importFs: needsFsImport,
            expectThrow,
            expectTimeout,
            pager: Boolean(pagerItemTypeName),
            pagerFnName: `${operationId}_pager`,
          })
        }
        let genTest = exampleTemplate

        genTest = replacer(genTest, [
          ['console.log(JSON.stringify(response, null, 2));', ''],
        ])
        // If this test is a timeout-only check, drop unused ApiError import
        if (
          !isWebSocket &&
          expectedToTimeout.includes(toTestPathString(tag, operationId)) &&
          !testsExpectedToThrow.includes(toTestPathString(tag, operationId))
        ) {
          genTest = genTest
            .replace(/,\s*ApiError\s*}/, ' }')
            .replace(/ApiError\s*,\s*/g, '')
            .replace(/,\s*ApiError/g, '')
        }
        const genTestsWritePromise = !operationsToNotGenerateTestsFor.includes(
          operationId
        )
          ? fsp.writeFile(
              `./__tests__/gen/${tag}-${operationId}.test.ts`,
              genTest,
              'utf8'
            )
          : Promise.resolve()
        if (!isWebSocket) {
          exampleTemplate = replacer(exampleTemplate, [
            ["from '../../src/index.js'", "from '@kittycad/lib'"],
            [/describe\('Testing(.|\n)+?(}\);)(.|\n)+?(}\);)/g, ''],
            [/.+return response;\n/g, ''],
          ])
          // Ensure ApiError is imported in the docs example
          // Avoid "useless escape" on braces by using character classes
          {
            const pattern = new RegExp(
              `import\\s*[{]\\s*${escapeRegExp(safeTag)}\\s*[}]\\s*from\\s*'@kittycad/lib';`
            )
            exampleTemplate = exampleTemplate.replace(
              pattern,
              `import { ${safeTag}, ApiError } from '@kittycad/lib';`
            )
          }
          // Append error-handling snippet for docs readers
          exampleTemplate += [
            '',
            '// Error handling',
            'try {',
            '  const res = await example()',
            '} catch (e) {',
            '  if (e instanceof ApiError) {',
            "    console.error('status', e.status, 'code', e.body?.error_code)",
            "    console.error('message', e.body?.message)",
            "    console.error('request_id', e.body?.request_id)",
            '  } else {',
            '    throw e',
            '  }',
            '}',
          ].join('\n')
        } else {
          exampleTemplate = replacer(exampleTemplate, [
            ["from '../../src/index.js'", "from '@kittycad/lib'"],
            [/describe\('Testing(.|\n)+?(}\);)(.|\n)+?(}\);)/g, ''],
          ])
        }
        spec.paths[operation.path][operation.method]['x-typescript'] = {
          example: format(exampleTemplate, {
            parser: 'babel',
            tabWidth: 4,
            semi: false,
            singleQuote: true,
            arrowParens: 'avoid',
            trailingComma: 'es5',
          }),
          libDocsLink: '',
        }

        if (!indexFile[safeTag]) {
          indexFile[safeTag] = {
            importsStr: [],
            exportsStr: [],
          }
        }
        if (isWebSocket) {
          const className = toWsClassName(operationId)
          indexFile[safeTag].importsStr.push(
            `import ${className} from './api/${tag}/${operationId}.js';`
          )
          indexFile[safeTag].exportsStr.push(
            `${operationId}: (params) => new ${className}(params)`
          )
        } else {
          indexFile[safeTag].importsStr.push(
            `import ${operationId} from './api/${tag}/${operationId}.js';`
          )
          indexFile[safeTag].exportsStr.push(operationId)
          if (pagerItemTypeName) {
            indexFile[safeTag].importsStr.push(
              `import { ${operationId}_pager } from './api/${tag}/${operationId}.js';`
            )
            indexFile[safeTag].exportsStr.push(`${operationId}_pager`)
          }
        }
        const libWritePromise = fsp.writeFile(
          `./src/api/${tag}/${operationId}.ts`,
          template,
          'utf8'
        )
        return [genTestsWritePromise, libWritePromise]
      } catch (e) {
        console.error('apiGen failure for', operationId, e)
        throw e
      }
    }
  )
  await Promise.all(writePromises.flat())
  let indexFileString = ''
  // sorts are added to keep a consistent order since awaiting the promises has non-deterministic order
  Object.entries(indexFile)
    .sort(([a], [b]) => (a > b ? 1 : -1))
    .forEach(([tag, { importsStr: imports, exportsStr: exports }]) => {
      if (exports.length === 0) return
      indexFileString += imports.sort().join('\n') + '\n'
      indexFileString += `export const ${tag} = { ${exports
        .sort()
        .join(', ')} };\n\n`
    })
  // Re-export all model types at the top level so users can `import type { X } from '@kittycad/lib'`.
  {
    const allNames = Array.from(new Set(Object.values(lookup))).filter(
      (n) => typeof n === 'string' && /^[A-Za-z_][A-Za-z0-9_]*$/.test(n)
    )
    const rename = {
      Error: 'ApiErrorBody',
      ApiError: 'ApiErrorModel',
    } as Record<string, string>
    const specifiers = allNames
      .map((n) => (rename[n] ? `${n} as ${rename[n]}` : n))
      .sort()
    if (specifiers.length) {
      indexFileString += `export type { ${specifiers.join(
        ', '
      )} } from './models.js';\n`
    }
  }
  indexFileString += `export { Client} from './client.js';\n`
  indexFileString += `export { ApiError } from './errors.js';\n`
  indexFileString += `export { Pager, createPager } from './pagination.js';\n`
  await fsp.writeFile(`./src/index.ts`, indexFileString, 'utf8')

  // Build a concise WS usage snippet if the spec has any WS endpoints
  const wsOps = Object.entries(operations).filter(([, op]) =>
    Boolean((op.specSection as any)['x-dropshot-websocket'])
  )
  let wsSnippet = ''
  if (wsOps.length) {
    const prefer = ['ml_copilot_ws', 'modeling_commands_ws', 'ml_reasoning_ws']
    const preferred = wsOps.find(([id]) => prefer.includes(id)) || wsOps[0]
    const [sampleId, sampleOp] = preferred
    const sampleTag = (sampleOp.specSection?.tags?.[0] || 'api')
      .toString()
      .replaceAll('-', '_')
    wsSnippet = [
      `// WebSocket usage`,
      `async function ExampleWs() {`,
      `  const client = new Client('your-token');`,
      `  const conn = await ${sampleTag}.${sampleId}.connect({ client });`,
      `  // Send a message (shape depends on endpoint)`,
      `  // conn.send({ type: 'headers', headers: { 'X-Example': '1' } } as any);`,
      `  // Read one message:`,
      `  // const msg = await conn.recv();`,
      `  // Or stream:`,
      `  for await (const msg of conn) {`,
      `    console.log(msg);`,
      `    break;`,
      `  }`,
      `  conn.close();`,
      `}`,
    ].join('\n')
  }

  spec.info['x-typescript'] = {
    client: [
      `// Create a client with your token.`,
      `async function ExampleWithClient() {`,
      `  const client = new Client('your-token');`,
      `  const response = await meta.ping({ client });`,
      `  if ('error_code' in response) throw 'error';`,
      `  console.log(response.message); // 'pong'`,
      `}`,
      ``,
      `// - OR -`,
      ``,
      `// Your token will be parsed from the environment`,
      `// variable: 'KITTYCAD_TOKEN'.`,
      `async function ExampleWithOutClient() {`,
      `  const response = await meta.ping();`,
      `  if ('error_code' in response) throw 'error';`,
      `  console.log(response.message); // 'pong'`,
      `}`,
    ].join('\n'),
    install: 'npm install @kittycad/lib\n# or \n$ yarn add @kittycad/lib',
    ...(wsSnippet ? { ws: wsSnippet } : {}),
  }
  const patch = generate(observer)
  await fsp.writeFile(
    `./kittycad.ts.patch.json`,
    JSON.stringify(patch, null, 2),
    'utf8'
  )
}

function wrapInBacktics(str: string) {
  return `\`${str}\``
}

function replacer(
  template: string,
  replaceList: (
    | [string | RegExp, string]
    | [string | RegExp, string, boolean]
  )[]
): string {
  let result = template
  replaceList.forEach(([search, newVal, debug]) => {
    if (debug) {
      const newTemplate = result.replace(search, newVal)
      console.log({ old: result, newTemplate })
    }
    result = result.replaceAll(search, newVal)
  })
  return result
}

export function isObj(obj: any) {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    !Array.isArray(obj) &&
    Object.keys(obj).length
  )
}

function escapeRegExp(str: string): string {
  // Escape special regex characters for safe embedding
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function isRef(schema: unknown): schema is OpenAPIV3.ReferenceObject {
  return (
    typeof schema === 'object' &&
    schema !== null &&
    '$ref' in (schema as Record<string, unknown>)
  )
}

function toPascalCase(str: string): string {
  return (str || '')
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('')
}
function toWsClassName(opId: string): string {
  let id = opId || ''
  if (id.startsWith('create_')) id = id.slice('create_'.length)
  return toPascalCase(id)
}

function buildOperationJsDoc(
  spec: OpenAPIV3.OperationObject,
  opts: {
    operationId: string
    params: OpenAPIV3.ParameterObject[] | undefined
    isMultipart: boolean
    hasBody: boolean
    paramTypeMap: Record<string, string>
    paramRequiredMap: Record<string, boolean>
    bodyTypeName?: string
    returnTypeName: string
    importedReturnTypes: string[]
  }
): string {
  const lines: string[] = []
  const summary = (spec.summary || '').trim()
  const desc = (spec.description || '').trim()
  const tags = (spec.tags || []).join(', ')
  if (summary) lines.push(summary)
  if (desc) lines.push('', ...desc.split('\n'))
  if (tags) lines.push('', `Tags: ${tags}`)

  // Document the single params object with its properties
  lines.push('', '@param params Function parameters.')
  lines.push(`@property {Client} [client] Optional client with auth token.`)
  for (const p of opts.params || []) {
    const name = p.name
    const d = (p.description || '').toString().trim()
    const where = p.in ? ` (${p.in})` : ''
    const t = opts.paramTypeMap[name] || 'unknown'
    lines.push(
      `@property {${t}} ${name} ${sanitizeForJsDoc(`${d}${where}`.trim())}`
    )
  }
  if (opts.isMultipart) {
    lines.push(
      `@property {File[]} files Files attached as multipart/form-data.`
    )
  }
  if (opts.hasBody) {
    const body = spec.requestBody as
      | OpenAPIV3.RequestBodyObject
      | OpenAPIV3.ReferenceObject
      | undefined
    const bodyDesc =
      body && !('$ref' in (body || {}))
        ? (body as OpenAPIV3.RequestBodyObject).description || ''
        : ''
    const t = opts.bodyTypeName || 'unknown'
    const nameOut = opts.paramRequiredMap['body'] ? 'body' : '[body]'
    lines.push(
      `@property {${t}} ${nameOut} ${sanitizeForJsDoc(bodyDesc || 'Request body payload')}`
    )
  }
  // @returns – prefer 200/201/2xx
  const responses = spec.responses || {}
  const preferred = ['200', '201', '204']
  let retDesc = ''
  for (const code of preferred) {
    const r = (responses as any)[code]
    if (r && r.description) {
      retDesc = String(r.description)
      break
    }
  }
  if (!retDesc) {
    const anyResp = Object.values(responses)[0] as any
    retDesc = anyResp?.description || ''
  }
  const returnsType = `Promise<${opts.returnTypeName}>`
  if (retDesc)
    lines.push(`@returns {${returnsType}} ${sanitizeForJsDoc(retDesc)}`)
  else lines.push(`@returns {${returnsType}} Response payload.`)

  if ((opts.importedReturnTypes || []).length) {
    lines.push(
      '',
      `Possible return types: ${(opts.importedReturnTypes || []).join(' | ')}`
    )
  }
  return wrapJsDoc(lines)
}

function buildWsJsDoc(
  spec: OpenAPIV3.OperationObject,
  opts: {
    operationId: string
    params: OpenAPIV3.ParameterObject[] | undefined
    paramTypeMap: Record<string, string>
    paramRequiredMap: Record<string, boolean>
  }
): string {
  const lines: string[] = []
  const summary = (spec.summary || '').trim()
  const desc = (spec.description || '').trim()
  const tags = (spec.tags || []).join(', ')
  if (summary) lines.push(summary)
  if (desc) lines.push('', ...desc.split('\n'))
  if (tags) lines.push('', `Tags: ${tags}`)
  lines.push('', '@template Req WebSocket request message type')
  lines.push('@template Res WebSocket response message type')
  lines.push('@param functionNameParams Parameters for URL templating and auth')
  lines.push(`@property {Client} [client] Optional client with auth token.`)
  for (const p of opts.params || []) {
    const name = p.name
    const d = (p.description || '').toString().trim()
    const where = p.in ? ` (${p.in})` : ''
    const t = opts.paramTypeMap[name] || 'unknown'
    lines.push(
      `@property {${t}} ${name} ${sanitizeForJsDoc(`${d}${where}`.trim())}`
    )
  }
  return wrapJsDoc(lines)
}

function wrapJsDoc(lines: string[]): string {
  const body = lines
    .filter((l) => typeof l === 'string')
    .join('\n')
    .split('\n')
    .map((l) => ` * ${l}`)
    .join('\n')
  return ['/**', body, ' */'].join('\n')
}

function sanitizeForJsDoc(str: string): string {
  return String(str).replaceAll('*/', '*\\/')
}

function isArraySchema(
  s: OpenAPIV3.SchemaObject
): s is OpenAPIV3.ArraySchemaObject {
  return (s as OpenAPIV3.ArraySchemaObject).type === 'array'
}
