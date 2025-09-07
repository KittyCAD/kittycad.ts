import fsp from 'node:fs/promises';
import { OpenAPIV3 } from 'openapi-types';
import { format } from 'prettier';
import pkg from 'fast-json-patch';
import {
  testsExpectedToThrow,
  expectedToTimeout,
  toTestPathString,
  operationsToNotGenerateTestsFor,
} from './expectedToFail';
const { observe, generate } = pkg;

export default async function apiGen(lookup: any) {
  const spec: OpenAPIV3.Document = JSON.parse(
    await fsp.readFile('./spec.json', 'utf8'),
  );
  const observer = observe(spec);
  const tags = spec.tags;

  // Use fs.rm over deprecated fs.rmdir({ recursive: true }) to be compatible
  // with Node.js >= 22 and future removals of the recursive rmdir option.
  await fsp.rm('./src/api', { recursive: true, force: true });
  await fsp.rm('./__tests__/gen', { recursive: true, force: true });

  await fsp.mkdir(`./src/api`);
  await fsp.mkdir(`./__tests__/gen`);
  await Promise.allSettled(
    tags.map(({ name }) => fsp.mkdir(`./src/api/${name}`)),
  );
  const operationIds: string[] = [];
  const operations: {
    [key: string]: {
      specSection: OpenAPIV3.PathItemObject['post' | 'get' | 'put' | 'delete'];
      path: string;
      method: string;
    };
  } = {};
  Object.entries(spec.paths).forEach(([path, pathValue]) => {
    Object.entries(pathValue).forEach(([method, _methodValue]) => {
      const methodValue = _methodValue as OpenAPIV3.PathItemObject[
        | 'post'
        | 'get'
        | 'put'
        | 'delete'];
      const operationId = (methodValue as any).operationId;
      if (!operationId) {
        throw `no operationId for ${path} ${method}`;
      }
      operations[operationId] = {
        path,
        method,
        specSection: methodValue,
      };
      operationIds.push(operationId);
    });
  });
  const indexFile: {
    [tag: string]: {
      importsStr: string[];
      exportsStr: string[];
    };
  } = {};
  const writePromises = Object.entries(operations).map(
    async ([operationId, operation]) => {
      if ('hidden' === (operation.specSection as any).tags[0]) {
        return [];
      }

      const isWebSocket = Boolean(
        (operation.specSection as any)['x-dropshot-websocket'],
      );

      let exampleTemplate: string = (
        await fsp.readFile(
          isWebSocket
            ? './src/exampleAndGenWsTestTemplate.md'
            : './src/exampleAndGenTestTemplate.md',
          'utf8',
        )
      )
        .replaceAll('```typescript', '')
        .replaceAll('```', '');

      let template = (
        await fsp.readFile(
          isWebSocket ? './src/templateWS.md' : './src/template.md',
          'utf8',
        )
      )
        .replaceAll('```typescript', '')
        .replaceAll('```', '');

      let inputTypes: string[] = ['client?: Client'];
      let inputParams: string[] = ['client'];
      const inputParamsExamples: string[] = [];
      if (isWebSocket) {
        inputParamsExamples.push(
          `client: new Client(process.env.KITTYCAD_TOKEN)`,
        );
      }

      // If we have a multipart request, use the multipart template.
      if (
        (operation.specSection?.requestBody as any)?.content?.[
          'multipart/form-data'
        ]?.schema
      ) {
        template = (await fsp.readFile('./src/templateMultipart.md', 'utf8'))
          .replaceAll('```typescript', '')
          .replaceAll('```', '');
        inputParams.push('files');
        inputParamsExamples.push(
          `files: [{name: "thing.kcl", data: new Blob(['thing = 1'], {type: 'text/plain'})}]`,
        );
      }

      const importedParamTypes: string[] = [];
      const path = operation.path;
      const params = operation.specSection
        .parameters as OpenAPIV3.ParameterObject[];
      template = template.replaceAll(',', ',');
      let urlPathParams: string[] = path.split('/');
      const urlQueryParams: string[] = [];
      (params || []).forEach(({ name, in: _in, schema }) => {
        let _type = 'any';
        if ('$ref' in schema) {
          const ref = schema.$ref;
          _type = lookup[ref];
          importedParamTypes.push(_type);
          const refName = ref.split('/').pop();
          const reffedSchema = spec.components.schemas[refName];
          if ('$ref' in reffedSchema) {
            throw 'bad';
          }
          if (reffedSchema.type === 'string' && reffedSchema.enum) {
            if (operationId.includes('file') && name === 'src_format') {
              const input =
                reffedSchema.enum.find((fmt) => fmt === 'obj') ||
                reffedSchema.enum.find((fmt) => fmt === 'svg');
              inputParamsExamples.push(`${name}: '${input}'`);
            } else if (name === 'output_format') {
              inputParamsExamples.push(`${name}: '${reffedSchema.enum[0]}'`);
            } else {
              inputParamsExamples.push(`${name}: '${reffedSchema.enum[1]}'`);
            }
          } else if ('oneOf' in reffedSchema) {
            const isOutput = ['output_unit', 'output_format'].includes(name);
            const input = (reffedSchema.oneOf?.find(
              (_input: OpenAPIV3.SchemaObject) =>
                (_input?.enum[0] === 'obj' && !isOutput) ||
                _input?.enum[0] === 'svg' ||
                _input?.enum[0] === 'stl',
            ) ||
              reffedSchema.oneOf?.[isOutput ? 1 : 0]) as OpenAPIV3.SchemaObject;
            inputParamsExamples.push(`${name}: '${input?.enum?.[0]}'`);
          } else if (
            reffedSchema.type === 'string' &&
            reffedSchema.format === 'uuid'
          ) {
            inputParamsExamples.push(
              `${name}: '${'00000000-0000-0000-0000-000000000000'}'`,
            );
          } else if (
            reffedSchema.type === 'string' &&
            refName == 'ServiceAccountUuid'
          ) {
            inputParamsExamples.push(
              `${name}: '${'svc-00000000-0000-0000-0000-000000000000'}'`,
            );
          } else if (
            reffedSchema.type === 'string' &&
            refName == 'SessionUuid'
          ) {
            inputParamsExamples.push(
              `${name}: '${'ses-00000000-0000-0000-0000-000000000000'}'`,
            );
          } else if (
            reffedSchema.type === 'string' &&
            refName == 'ApiTokenUuid'
          ) {
            inputParamsExamples.push(
              `${name}: '${'api-00000000-0000-0000-0000-000000000000'}'`,
            );
          } else if (
            reffedSchema.type === 'string' &&
            refName == 'DeviceAccessTokenUuid'
          ) {
            inputParamsExamples.push(
              `${name}: '${'dev-00000000-0000-0000-0000-000000000000'}'`,
            );
          } else if (
            reffedSchema.type === 'string' &&
            refName == 'UserIdentifier'
          ) {
            inputParamsExamples.push(`${name}: '${'31337'}'`);
          } else if (
            reffedSchema.type === 'string' &&
            refName == 'CodeLanguage'
          ) {
            inputParamsExamples.push(`${name}: '${'node'}'`);
          }
        } else {
          if (schema.type === 'number' || schema.type === 'integer') {
            _type = 'number';
            inputParamsExamples.push(`${name}: ${7}`);
          } else if (schema.type === 'string' || schema.type === 'boolean') {
            inputParamsExamples.push(
              `${name}: ${schema.type === 'string' ? "'string'" : 'true'}`,
            );
            _type = schema.type;
          }
        }
        inputTypes.push(`${name}: ${_type}`);
        if (!name) {
          throw 'no name for param';
        }
        inputParams.push(name);
        if (_in === 'path') {
          urlPathParams = urlPathParams.map((p) => {
            if (p === `{${name}}`) {
              return `\${${name}}`;
            }
            return p;
          });
        } else {
          urlQueryParams.push(`${name}=\${${name}}`);
        }
      });
      const templateUrlPath = wrapInBacktics(
        `${urlPathParams.join('/')}${
          urlQueryParams.length ? `?${urlQueryParams.join('&')}` : ''
        }`,
      );
      const requestBody = operation.specSection
        ?.requestBody as OpenAPIV3.ResponseObject;

      if (!isWebSocket) {
        // ASSUMPTION: That there is 1 Content-Type for a request.
        // IN PRACTICE: We only ever use 1 Content-Type for a request.
        const contentType = (
          Object.keys(requestBody?.content ?? {})[0] ?? 'text/plain'
        ).replaceAll(' ', '');

        template = template.replaceAll(
          'contentTypeToBeReplacedDuringApiGen',
          // We need those surrounding ''!
          `'${contentType}'`,
        );
      }

      if (
        (!isWebSocket &&
          (requestBody?.content?.['application/json']?.schema as any)?.$ref) ||
        (requestBody?.content?.['multipart/form-data']?.schema as any)?.$ref
      ) {
        let schema = requestBody.content['application/json']?.schema as any;
        if (
          (requestBody?.content?.['multipart/form-data']?.schema as any)?.$ref
        ) {
          schema = requestBody.content['multipart/form-data'].schema as any;
        }
        const ref = schema.$ref;
        const typeReference = lookup[ref];
        importedParamTypes.push(typeReference);
        inputTypes.push(`body: ${typeReference}`);
        inputParams.push('body');

        const mapOverProperties = (rawRef: string): string => {
          const refSchema = spec.components.schemas[
            rawRef.split('/').pop()
          ] as OpenAPIV3.SchemaObject;
          const returnExample = (refSchema: OpenAPIV3.SchemaObject): string => {
            if ('type' in refSchema && !refSchema.properties) {
              if (refSchema.type === 'string') {
                return `"${
                  refSchema.description.replaceAll('"', ',') || 'string'
                }"`;
              }
              if (refSchema.type === 'number') {
                return `7`;
              }
              if (refSchema.type === 'boolean') {
                return `true`;
              }
            }
            if ('oneOf' in refSchema) {
              const oneOf = refSchema.oneOf;
              if ('enum' in oneOf[0]) {
                return `'${oneOf[0].enum[0]}'`;
              } else if ('type' in oneOf[0]) {
                return returnExample(oneOf[0]);
              }
            }
            if (!refSchema.properties) {
              return '';
            }
            const requiredProperties = Object.entries(refSchema.properties);
            if (!requiredProperties.length) {
              return '';
            }
            return `{${requiredProperties
              .map(([key, value]) => {
                if ('$ref' in value) {
                  // TODO
                  return '';
                }
                // Handle object properties, including index signatures
                if (
                  (value as any).type === 'object' &&
                  'additionalProperties' in (value as any)
                ) {
                  const addProps = (value as any)
                    .additionalProperties as OpenAPIV3.SchemaObject;
                  // If the index signature is strings, provide a minimal example
                  if ((addProps as any).type === 'string') {
                    return `${key}: {}`;
                  }
                  // Fallback to an empty object for other cases
                  return `${key}: {}`;
                }
                if (value.type === 'string' && 'enum' in value) {
                  return `${key}: '${value.enum[0]}'`;
                }
                if (value.type === 'string') {
                  return `${key}: "${
                    (value.description || '').replaceAll('"', "'") || 'string'
                  }"`;
                }
                if (value.type === 'number' || value.type === 'integer') {
                  return `${key}: 7`;
                }
                if (value.type === 'boolean') {
                  return `${key}: true`;
                }
                if (
                  'allOf' in value &&
                  value.allOf.length === 1 &&
                  '$ref' in value.allOf[0]
                ) {
                  const ref = value.allOf[0].$ref;
                  return `${key}: ${mapOverProperties(ref)}`;
                }
                if (
                  value.type === 'array' &&
                  'type' in value.items &&
                  value.items.type === 'string'
                ) {
                  return `${key}: ['string']`;
                }
                if (value.type === 'array' && '$ref' in value.items) {
                  // assuming text to cad iteration for now
                  return `${key}: []`;
                }
                if (value.type === 'object') {
                  // generic nested object; provide minimal example
                  return `${key}: {}`;
                }
                return '';
              })
              .filter(Boolean)
              .join(', ')}}`;
          };
          return returnExample(refSchema);
        };

        const theStr = mapOverProperties(ref);
        if (theStr) {
          inputParamsExamples.push(`body: ${theStr}`);
        }

        template = template.replaceAll(
          "body: 'BODY'",
          'body: JSON.stringify(body)',
        );
        template = template.replaceAll(
          "formData.append('event', 'BODY')",
          "formData.append('event', JSON.stringify(body))",
        );
      } else if (
        !isWebSocket &&
        requestBody?.content?.['application/octet-stream']
      ) {
        const schema = requestBody.content['application/octet-stream']
          .schema as OpenAPIV3.SchemaObject;
        if (schema?.type !== 'string') {
          throw 'requestBody type not implemented';
        }
        inputTypes.push('body: string');
        inputParams.push('body');

        let exampleFile = 'example';

        // For requests depending on a model file
        const modelFmts = inputParamsExamples.find((str) => {
          return str.startsWith('src_format:');
        });
        if (modelFmts) {
          exampleFile = modelFmts.includes('obj')
            ? 'example.obj'
            : 'example.svg';
        }

        // For requests depending on a source code file
        const langFmts = inputParamsExamples.find((str) => {
          return str.startsWith('lang:');
        });
        if (langFmts) {
          exampleFile = `example.${langFmts.replace(/lang: '([a-z]+)'/, '$1')}`;
        }

        inputParamsExamples.push(
          `body: await fsp.readFile('./${exampleFile}', 'base64')`,
        );
        exampleTemplate = `import fsp from 'fs/promises';` + exampleTemplate;
        template = template.replaceAll("body: 'BODY'", 'body');
      } else {
        template = template.replaceAll(/body: 'BODY'.+/g, '');
        template = template.replaceAll("formData.append('event', 'BODY');", '');
      }

      if (inputParams.length === 1 && !isWebSocket) {
        template = replacer(template, [
          [
            'functionNameParams: FunctionNameParams,',
            'functionNameParams: FunctionNameParams = {},',
          ],
        ]);
        exampleTemplate = replacer(exampleTemplate, [
          [`{ param: 'param' }`, ''],
        ]);
      }
      const importedTypes: string[] = [];
      if (!isWebSocket) {
        Object.values(operation.specSection?.responses).forEach((response) => {
          const schema = (response as any)?.content?.['application/json']
            ?.schema as OpenAPIV3.SchemaObject;
          if (!schema) {
            let ref = (response as any)?.$ref || '';
            ref = ref.replace('responses', 'schemas');
            const typeReference = lookup[ref];

            if (
              typeReference &&
              typeReference !== 'Error_type' &&
              !importedTypes.includes(typeReference)
            ) {
              importedTypes.push(typeReference);
            }
          } else if (
            (response as any)?.content['application/json']?.schema?.$ref
          ) {
            const ref = (response as any)?.content['application/json']?.schema
              ?.$ref;
            const typeReference = lookup[ref];
            if (
              typeReference &&
              typeReference !== 'Error_type' &&
              !importedTypes.includes(typeReference)
            ) {
              importedTypes.push(typeReference);
            }
          } else if (
            Object.keys(schema).length === 0 ||
            schema.type === 'string'
          ) {
            // do nothing
          } else if (schema.type === 'array') {
            const items = schema.items as OpenAPIV3.SchemaObject;
            if ((items as any).$ref) {
              const typeReference = lookup[(items as any).$ref];
              if (
                typeReference &&
                typeReference !== 'Error_type' &&
                !importedTypes.includes(typeReference + '[]')
              ) {
                importedTypes.push(typeReference + '[]');
              }
            } else if (items.type === 'string') {
              // do nothing
            } else {
              // Fallback: accept any[] for unhandled array response shapes
              importedTypes.push('any[]');
            }
          } else if (
            schema.type === 'object' &&
            'additionalProperties' in schema
          ) {
            schema.additionalProperties;
            const addProps =
              schema.additionalProperties as OpenAPIV3.SchemaObject;
            if (addProps.type === 'array' && '$ref' in addProps.items) {
              const typeReference = lookup[addProps.items.$ref];
              if (
                typeReference &&
                typeReference !== 'Error_type' &&
                !importedTypes.includes(typeReference + '[]')
              ) {
                importedTypes.push(typeReference + '[]');
              }
            }
          } else {
            // Fallback: accept any for unhandled response shapes
            importedTypes.push('any');
          }
        });
      } else {
        // For websocket endpoints, import request/response message types if present
        let wsReqType = 'any';
        let wsRespType = 'any';
        const reqSchema = (requestBody as any)?.content?.['application/json']
          ?.schema as any;
        if (reqSchema?.$ref) {
          wsReqType = lookup[reqSchema.$ref];
          importedTypes.push(wsReqType);
        }
        const wsDefaultResp = (operation.specSection?.responses as any)?.[
          'default'
        ];
        const respSchema = wsDefaultResp?.content?.['application/json']?.schema;
        if (respSchema?.$ref) {
          wsRespType = lookup[respSchema.$ref];
          importedTypes.push(wsRespType);
        }

        // Replace placeholders in WS template
        const className = toWsClassName(operationId);
        const paramsName = `${className}Params`;
        template = replacer(template, [
          [
            /interface FunctionNameParams(.|\n)+?}/g,
            `interface ${paramsName} {\n${inputTypes.join('; ')}\n}`,
          ],
          [/class FunctionNameClass/g, `class ${className}`],
          [
            /export default class FunctionNameClass/g,
            `export default class ${className}`,
          ],
          [/FunctionNameClass/g, `${className}`],
          [/FunctionNameParams/g, `${paramsName}`],
          [
            `import { Client } from '../../client.js';`,
            `import { Client } from '../../client.js';\nimport {${[
              ...new Set([...importedParamTypes, ...importedTypes]),
            ]
              .map((a) => (a || '').replaceAll('[', '').replaceAll(']', ''))
              .join(', ')}} from '../../models.js';`,
          ],
          [`'string' + functionNameParams.exampleParam`, templateUrlPath],
          [/RequestTypeName/g, wsReqType],
          [/ResponseTypeName/g, wsRespType],
        ]);
      }

      if (!isWebSocket) {
        const returnTyping = `type ${FC(operationId)}_return = ${
          importedTypes.length ? importedTypes.join(' | ') : 'any'
        }`;

        template = replacer(template, [
          [/interface FunctionNameReturn(.|\n)+?}/g, returnTyping],
          [`'string' + functionNameParams.exampleParam`, templateUrlPath],
          [
            `functionNameParams:`,
            `{${inputParams.filter((a) => a).join(', ')}}:`,
          ],
          [`exampleParam: string`, inputTypes.join('; ')],
          ["method: 'METHOD'", `method: '${operation.method.toUpperCase()}'`],
          ['function functionName', `function ${operationId}`],
          ['FunctionNameReturn', `${FC(operationId)}_return`],
          ['FunctionNameParams', `${FC(operationId)}_params`],
          [
            "import * as types from './src/models.ts';",
            `import {${[...new Set([...importedTypes, ...importedParamTypes])]
              .map((a) => (a || '').replaceAll('[', '').replaceAll(']', ''))
              .join(', ')}} from '../../models.js';`,
          ],
        ]);
      } else {
        // ws-specific: ensure params typing and object destructuring
        const className = toWsClassName(operationId);
        const paramsName = `${className}Params`;
        template = replacer(template, [
          [
            `functionNameParams: FunctionNameParams,`,
            `functionNameParams: ${paramsName},`,
          ],
          [
            `functionNameParams:`,
            `{${inputParams.filter((a) => a).join(', ')}}:`,
          ],
        ]);
      }

      const tag = operation.specSection?.tags?.[0] || 'err';
      const safeTag = tag.replaceAll('-', '_');
      if (isWebSocket) {
        exampleTemplate = replacer(exampleTemplate, [
          [`param: 'param'`, inputParamsExamples.filter((a) => a).join(', ')],
          ['{ api }', `{ ${safeTag}, Client }`],
          ['api.section', `${safeTag}.${operationId}`],
          [
            `import { api } from '../../src/index.js';`,
            `import { ${safeTag}, Client } from '../../src/index.js';`,
          ],
        ]);
      } else {
        exampleTemplate = replacer(exampleTemplate, [
          [`param: 'param'`, inputParamsExamples.filter((a) => a).join(', ')],
          ['{ api }', `{ ${safeTag} }`],
          ['api.section', `${safeTag}.${operationId}`],
        ]);
      }
      if (
        !isWebSocket &&
        testsExpectedToThrow.includes(toTestPathString(tag, operationId))
      ) {
        // these test are expected to fail
        exampleTemplate = replacer(exampleTemplate, [
          ['expect(await example()).toBeTruthy();', ''],
          [/const examplePromise = example(.|\n)+?.toBe\('timeout'\)/g, ''],
        ]);
      } else if (
        !isWebSocket &&
        expectedToTimeout.includes(toTestPathString(tag, operationId))
      ) {
        exampleTemplate = replacer(exampleTemplate, [
          ['expect(await example()).toBeTruthy();', ''],
          [/try {(.|\n)+?}(.|\n)+?}/g, ''],
        ]);
      } else {
        if (!isWebSocket) {
          exampleTemplate = replacer(exampleTemplate, [
            [/try {(.|\n)+?}(.|\n)+?}/g, ''],
            [/const examplePromise = example(.|\n)+?.toBe\('timeout'\)/g, ''],
          ]);
        }
      }
      let genTest = exampleTemplate;

      genTest = replacer(genTest, [
        ['console.log(JSON.stringify(response, null, 2));', ''],
      ]);
      const genTestsWritePromise = !operationsToNotGenerateTestsFor.includes(
        operationId,
      )
        ? fsp.writeFile(
            `./__tests__/gen/${tag}-${operationId}.test.ts`,
            genTest,
            'utf8',
          )
        : Promise.resolve();
      if (!isWebSocket) {
        exampleTemplate = replacer(exampleTemplate, [
          ["from '../../src/index.js'", "from '@kittycad/lib'"],
          [/describe\('Testing(.|\n)+?(}\);)(.|\n)+?(}\);)/g, ''],
          [/.+return response;\n/g, ''],
        ]);
      } else {
        exampleTemplate = replacer(exampleTemplate, [
          ["from '../../src/index.js'", "from '@kittycad/lib'"],
          [/describe\('Testing(.|\n)+?(}\);)(.|\n)+?(}\);)/g, ''],
        ]);
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
      };

      if (!indexFile[safeTag]) {
        indexFile[safeTag] = {
          importsStr: [],
          exportsStr: [],
        };
      }
      indexFile[safeTag].importsStr.push(
        `import ${operationId} from './api/${tag}/${operationId}.js';`,
      );
      indexFile[safeTag].exportsStr.push(operationId);
      const libWritePromise = fsp.writeFile(
        `./src/api/${tag}/${operationId}.ts`,
        template,
        'utf8',
      );
      return [genTestsWritePromise, libWritePromise];
    },
  );
  await Promise.all(writePromises.flat());
  let indexFileString = '';
  // sorts are added to keep a consistent order since awaiting the promises has non-deterministic order
  Object.entries(indexFile)
    .sort(([a], [b]) => (a > b ? 1 : -1))
    .forEach(([tag, { importsStr: imports, exportsStr: exports }]) => {
      if (exports.length === 0) return;
      indexFileString += imports.sort().join('\n') + '\n';
      indexFileString += `export const ${tag} = { ${exports
        .sort()
        .join(', ')} };\n\n`;
    });
  indexFileString += `export type { Models } from './models.js';\n`;
  indexFileString += `export { Client} from './client.js';\n`;
  indexFileString += `export { ApiError } from './errors.js';\n`;
  await fsp.writeFile(`./src/index.ts`, indexFileString, 'utf8');

  // Build a concise WS usage snippet if the spec has any WS endpoints
  const wsOps = Object.entries(operations).filter(([, op]) =>
    Boolean((op.specSection as any)['x-dropshot-websocket']),
  );
  let wsSnippet = '';
  if (wsOps.length) {
    const prefer = ['ml_copilot_ws', 'modeling_commands_ws', 'ml_reasoning_ws'];
    const preferred = wsOps.find(([id]) => prefer.includes(id)) || wsOps[0];
    const [sampleId, sampleOp] = preferred;
    const sampleTag = (sampleOp.specSection?.tags?.[0] || 'api')
      .toString()
      .replaceAll('-', '_');
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
    ].join('\n');
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
  };
  const patch = generate(observer);
  await fsp.writeFile(
    `./kittycad.ts.patch.json`,
    JSON.stringify(patch, null, 2),
    'utf8',
  );
}

function wrapInBacktics(str: string) {
  return `\`${str}\``;
}

function replacer(
  template: string,
  replaceList: (
    | [string | RegExp, string]
    | [string | RegExp, string, boolean]
  )[],
): string {
  let result = template;
  replaceList.forEach(([search, newVal, debug]) => {
    if (debug) {
      const newTemplate = result.replace(search, newVal);
      console.log({ old: result, newTemplate });
    }
    result = result.replaceAll(search, newVal);
  });
  return result;
}

export function isObj(obj: any) {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    !Array.isArray(obj) &&
    Object.keys(obj).length
  );
}

function FC(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function toPascalCase(str: string): string {
  return (str || '')
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
}
