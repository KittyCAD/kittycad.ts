import fsp from 'node:fs/promises';
import { OpenAPIV3 } from 'openapi-types';
import { observe, generate } from 'fast-json-patch';
import { format } from 'prettier';

export default async function apiGen(lookup: any) {
  const spec: OpenAPIV3.Document = JSON.parse(
    await fsp.readFile('./spec.json', 'utf8'),
  );
  const observer = observe(spec);
  const tags = spec.tags;
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
      if (methodValue.tags.includes('hidden')) {
        return;
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
      let template: string = (await fsp.readFile('./src/template.md', 'utf8'))
        .replaceAll('```typescript', '')
        .replaceAll('```', '');
      let exampleTemplate: string = (
        await fsp.readFile('./src/exampleAndGenTestTemplate.md', 'utf8')
      )
        .replaceAll('```typescript', '')
        .replaceAll('```', '');

      const importedParamTypes: string[] = [];
      const path = operation.path;
      const params = operation.specSection
        .parameters as OpenAPIV3.ParameterObject[];
      template = template.replaceAll(',', ',');
      const inputTypes: string[] = ['client?: Client'];
      const inputParams: string[] = ['client'];
      const inputParamsExamples: string[] = [];
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
            inputParamsExamples.push(`${name}: '${reffedSchema.enum[0]}'`);
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

      if (requestBody?.content?.['application/octet-stream']) {
        const schema = requestBody.content['application/octet-stream']
          .schema as OpenAPIV3.SchemaObject;
        if (schema?.type !== 'string') {
          throw 'requestBody type not implemented';
        }
        inputTypes.push('body: string');
        inputParams.push('body');
        inputParamsExamples.push("body: 'base64 encoded string'");
        template = template.replaceAll("body: 'BODY'", 'body');
      } else {
        template = template.replaceAll(/body: 'BODY'.+/g, '');
      }

      if (inputParams.length === 1) {
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
      Object.values(operation.specSection?.responses).forEach((response) => {
        const schema = (response as any)?.content?.['application/json']
          ?.schema as OpenAPIV3.SchemaObject;
        if (!schema) {
          let ref = (response as any)?.$ref || '';
          ref = ref.replace('responses', 'schemas');
          const typeReference = lookup[ref];

          if (!importedTypes.includes(typeReference) && ref) {
            importedTypes.push(typeReference);
          }
        } else if (
          (response as any)?.content['application/json']?.schema?.$ref
        ) {
          const ref = (response as any)?.content['application/json']?.schema
            ?.$ref;
          const typeReference = lookup[ref];
          if (!importedTypes.includes(typeReference)) {
            importedTypes.push(typeReference);
          }
        } else if (Object.keys(schema).length === 0) {
          // do nothing
        } else if (schema.type === 'array') {
          const items = schema.items as OpenAPIV3.SchemaObject;
          if ((items as any).$ref) {
            const typeReference = lookup[(items as any).$ref];
            if (!importedTypes.includes(typeReference + '[]')) {
              importedTypes.push(typeReference + '[]');
            }
          } else {
            throw 'not implemented';
          }
        } else {
          console.log('apiGen', schema);
          throw 'not implemented';
        }
      });

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
        ["method: 'METHOD'", `method: 'POST'`],
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

      const tag = operation.specSection?.tags?.[0] || 'err';
      const safeTag = tag.replaceAll('-', '_');
      exampleTemplate = replacer(exampleTemplate, [
        [`param: 'param'`, inputParamsExamples.filter((a) => a).join(', ')],
        ['{ api }', `{ ${safeTag} }`],
        ['api.section', `${safeTag}.${operationId}`],
      ]);
      if (
        [
          'file.create_file_density',
          'file.create_file_volume',
          'file.create_file_mass',
          'file.create_file_conversion',
        ].includes(`${tag}.${operationId}`)
      ) {
        // these test are expected to fail
        exampleTemplate = replacer(exampleTemplate, [
          ['expect(await example()).toBeTruthy();', ''],
        ]);
      } else {
        exampleTemplate = replacer(exampleTemplate, [
          [/try {(.|\n)+?}(.|\n)+?}/g, ''],
        ]);
      }
      let genTest = exampleTemplate;

      genTest = replacer(genTest, [
        ['console.log(JSON.stringify(response, null, 2));', ''],
      ]);
      const genTestsWritePromise = fsp.writeFile(
        `./__tests__/gen/${tag}-${operationId}.test.ts`,
        genTest,
        'utf8',
      );
      exampleTemplate = replacer(exampleTemplate, [
        ["from '../../src/index.js'", "from '@kittycad/lib'"],
        [/describe\('Testing(.|\n)+?(}\);)(.|\n)+?(}\);)/g, ''],
        [/.+return response;\n/g, ''],
      ]);
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
      indexFileString += imports.sort().join('\n') + '\n';
      indexFileString += `export const ${tag} = { ${exports
        .sort()
        .join(', ')} };\n\n`;
    });
  indexFileString += `export type { Models } from './models.js';\n`;
  indexFileString += `export { Client} from './client.js';\n`;
  await fsp.writeFile(`./src/index.ts`, indexFileString, 'utf8');
  spec.info['x-typescript'] = {
    client: '',
    install: 'npm install @kittycad/lib\n# or \nyarn add @kittycad/lib',
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
