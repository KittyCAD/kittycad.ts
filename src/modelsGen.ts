import fsp from 'fs/promises';
import { OpenAPIV3 } from 'openapi-types';
import apiGen from './apiGen';

main();

async function main() {
  const spec: OpenAPIV3.Document = JSON.parse(
    await fsp.readFile('./spec.json', 'utf8'),
  );
  const schemas = spec.components.schemas as {
    [key: string]: OpenAPIV3.SchemaObject;
  };
  const typeReference: { [key: string]: string } = {};
  const typeNameReference: { [key: string]: string } = {};
  let template = '';

  const addTypeName = ($ref: string, name: string) => {
    typeNameReference[$ref] = name;
  };

  const makeTypeStringForNode = (
    schema: OpenAPIV3.SchemaObject,
    name = '',
    isRoot = false,
  ): string => {
    const separator = schema.nullable ? '?:' : ':';
    const namePart = name ? `${name}${separator}` : '';
    if (schema.type === 'string' && schema.enum) {
      return [
        addCommentInfo(
          schema,
          `${namePart} ${schema.enum.map((e) => `'${e}'`).join(' | ')}`,
        ),
        '/* use-type */',
      ].join('\n');
    }
    if (schema.type === 'string' || schema.type === 'boolean') {
      return addCommentInfo(
        schema,
        `${namePart} ${schema.type} ${
          !namePart && isRoot ? '/* use-type */' : ''
        }`,
      );
    }
    if (schema.type === 'number' || schema.type === 'integer') {
      return addCommentInfo(schema, `${namePart} number`);
    }
    if (schema.type === 'object') {
      const objectInner = Object.entries(schema.properties)
        .map(([key, subSchema]: [string, OpenAPIV3.SchemaObject]) => {
          if (!(subSchema.type === 'array') && !(subSchema.type === 'object')) {
            if (subSchema.allOf) {
              const ref = (subSchema.allOf[0] as any).$ref;
              return addCommentInfo(
                subSchema,
                `${key}: ${typeNameReference[ref]}`,
              );
            }
            return makeTypeStringForNode(subSchema, key);
          } else if (subSchema.type === 'array') {
            const items = subSchema.items;
            if ((items as any).$ref) {
              const ref = (items as any).$ref;
              return addCommentInfo(
                subSchema,
                `${key}: ${typeNameReference[ref]}[]`,
              );
            }
            return `${makeTypeStringForNode(
              items as OpenAPIV3.SchemaObject,
              key,
            )}[]`;
          } else if (
            subSchema.type === 'object' &&
            subSchema.additionalProperties
          ) {
            if ((subSchema.additionalProperties as any).$ref) {
              const ref = (subSchema.additionalProperties as any).$ref;
              return addCommentInfo(
                subSchema,
                `${key}: {[key: string] : ${typeNameReference[ref]}}`,
              );
            }
            return `${key}: {[key: string] : ${makeTypeStringForNode(
              subSchema.additionalProperties as any,
            )}}`;
          }
          console.log(subSchema, key);
          throw 'subSchema not implemented ' + subSchema.type;
        })
        .join('; ');
      return `{${objectInner}}`;
    }
    if (
      JSON.stringify(Object.keys(schema)) === '["description"]' ||
      JSON.stringify(Object.keys(schema)) === '["description","nullable"]'
    ) {
      return `${namePart} string`;
    }
    if (schema.oneOf) {
      const unionParts = schema.oneOf.map(
        (subSchema: OpenAPIV3.SchemaObject) => {
          if (!(subSchema.type === 'array') && !(subSchema.type === 'object')) {
            if (subSchema.allOf) {
              const ref = (subSchema.allOf[0] as any).$ref;
              return typeReference[ref];
            }
            return makeTypeStringForNode(subSchema);
          } else if (subSchema.type === 'array') {
            const items = subSchema.items;
            if ((items as any).$ref) {
              const ref = (items as any).$ref;
              return `${typeReference[ref]}[]`;
            }
          } else if (subSchema.type === 'object') {
            return makeTypeStringForNode(subSchema);
          }
          throw 'oneOf subSchema not implemented ' + subSchema.type;
        },
      );
      return `${namePart} ${unionParts.join(' | ')} /* use-type */`;
    }
    if (schema.type === 'array') {
      return `${name}: ${makeTypeStringForNode(schema.items as any)}[]`;
    }
    console.log(schema);
    throw 'not implemented';
  };

  const componentRef = (key: string): string => '#/components/schemas/' + key;
  for (const key of Object.keys(schemas)) {
    addTypeName(componentRef(key), key + '_type');
  }
  const modelsExportParts = [];
  for (const [key, schema] of Object.entries(schemas)) {
    const typeBody = makeTypeStringForNode(schema, '', true);
    const typeName = typeNameReference[componentRef(key)];
    typeReference[componentRef(key)] = typeBody;
    modelsExportParts.push(typeName);
    if (typeBody.includes('/* use-type */')) {
      template += `export type ${typeName} = ${typeBody.replaceAll(
        '/* use-type */',
        '',
      )}\n\n`;
    } else {
      template += `export interface ${typeName} ${typeBody}\n\n`;
    }
  }
  template += `export interface Models {\n${modelsExportParts
    .map((name) => `${name}: ${name}`)
    .join(';\n')}\n}\n\n`;
  await fsp.writeFile(`./src/models.ts`, template, 'utf8');
  apiGen(typeNameReference);
}

function addCommentInfo(schema: any, typeString: string) {
  const {
    enum: _enum,
    type,
    allOf,
    items,
    properties,
    additionalProperties,
    description,
    ...newSchema
  } = schema;
  if (!Object.keys(newSchema).length && !description) {
    return typeString;
  } else if (!Object.keys(newSchema).length && description) {
    if (
      typeString.includes('\n') ||
      typeString.includes('|') ||
      description.includes('\n')
    ) {
      return `\n/* ${description} */\n${typeString}`;
    }
    return `${typeString} /* ${description} */`;
  } else if (Object.keys(newSchema).length <= 2 && description?.length < 50) {
    return `\n/* ${JSON.stringify({
      ...newSchema,
      description,
    })
      .slice(1, -1)
      .replaceAll(',"', ', "')
      .replaceAll('"', '')} */\n${typeString}`;
  }
  return `\n/*${JSON.stringify(
    { ...newSchema, description },
    null,
    2,
  )}*/\n${typeString}`;
}
