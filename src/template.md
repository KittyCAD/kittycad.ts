```typescript
import fetch from 'node-fetch';
import * as types from './src/models.ts';

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
  const fullUrl = 'https://api.kittycad.io' + url;
  const kittycadToken = process.env.KITTYCAD_TOKEN || ''
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
