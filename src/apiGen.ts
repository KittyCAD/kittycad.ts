import fsp from 'node:fs/promises';
import { OpenAPIV3 } from 'openapi-types';

export default async function apiGen(lookup: any) {
  const spec: OpenAPIV3.Document = JSON.parse(
    await fsp.readFile('./spec.json', 'utf8'),
  );
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
  const writePromises = Object.entries(operations).map(async ([operationId, operation]) => {
    if ('hidden' === (operation.specSection as any).tags[0]) {
      return;
    }
    let template: string = await fsp.readFile('./src/template.ts.txt', 'utf8');
    const path = operation.path;
    const params = operation.specSection
      .parameters as OpenAPIV3.ParameterObject[];
    template = template.replaceAll(',', ',');
    const inputTypes: string[] = [];
    const inputParams: string[] = [];
    let urlPathParams: string[] = path.split('/');
    const urlQueryParams: string[] = [];
    (params || []).forEach(({ name, in: _in }) => {
      inputTypes.push(`${name}: string`);
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
      template = template.replaceAll("body: 'BODY'", 'body');
    } else {
      template = template.replaceAll(/body: 'BODY'.+/g, '');
    }

    if (!inputParams.length) {
      template = replacer(template, [
        [/interface FunctionNameParams(.|\n)+?}/g, ''],
        [/functionNameParams: FunctionNameParams.+/g, ''],
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
      } else if ((response as any)?.content['application/json']?.schema?.$ref) {
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
        console.log(schema);
        throw 'not implemented';
      }
    });

    const returnTyping = `type ${FC(operationId)}_return = ${
      importedTypes.length ? importedTypes.join(' | ') : 'any'
    }`;

    template = replacer(template, [
      [/interface FunctionNameReturn(.|\n)+?}/g, returnTyping],
      [`'string' + functionNameParams.exampleParam`, templateUrlPath],
      [`functionNameParams:`, `{${inputParams.filter((a) => a).join(', ')}}:`],
      [`exampleParam: string`, inputTypes.join('; ')],
      ["method: 'METHOD'", `method: 'POST'`],
      ['function functionName', `function ${operationId}`],
      ['FunctionNameReturn', `${FC(operationId)}_return`],
      ['FunctionNameParams', `${FC(operationId)}_params`],
      [
        "import * as types from './src/models.ts';",
        `import {${importedTypes
          .map((a) => (a || '').replaceAll('[', '').replaceAll(']', ''))
          .join(', ')}} from '../../models.js';`,
      ],
    ]);

    const tag = operation.specSection?.tags?.[0] || 'err';
    const safeTag = tag.replaceAll('-', '_');
    if (!indexFile[safeTag]) {
      indexFile[safeTag] = {
        importsStr: [],
        exportsStr: [],
      };
    }
    indexFile[safeTag].importsStr.push(
      `import ${operationId} from './api/${tag}/${operationId}.js';`,
      );
    indexFile[safeTag].exportsStr.push(operationId)
    return fsp.writeFile(`./src/api/${tag}/${operationId}.ts`, template, 'utf8');
  });
  await Promise.all(writePromises);
  console.log('HEYY yo')
  let indexFileString = ''
  Object.entries(indexFile).forEach(([tag, { importsStr: imports, exportsStr: exports }]) => {
    indexFileString += imports.join('\n') + '\n';
    indexFileString += `export const ${tag} = { ${exports.join(', ')} };\n\n`;
  })
  console.log('hmm', indexFile, indexFileString);
  await fsp.writeFile(`./src/main.ts`, indexFileString, 'utf8');
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
