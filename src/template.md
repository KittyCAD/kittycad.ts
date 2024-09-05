```typescript
import * as types from './src/models.ts';
import { Client } from '../../client.js';

interface FunctionNameParams {
  exampleParam: string;
}

interface FunctionNameReturn {
  exampleReturn: string;
}

export default async function functionName(
  functionNameParams: FunctionNameParams,
): Promise<FunctionNameReturn> {
  const url = 'string' + functionNameParams.exampleParam;
  const urlBase = process?.env?.BASE_URL || 'https://api.zoo.dev';
  const fullUrl = urlBase + url;
  const kittycadToken = client
    ? client.token
    : process.env.KITTYCAD_TOKEN || '';
  const headers = {
    Authorization: `Bearer ${kittycadToken}`,
  };
  const fetchOptions = {
    method: 'METHOD',
    headers,
    body: 'BODY',
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as FunctionNameReturn;
  return result;
}
```
