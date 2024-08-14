import { AsyncApiCallOutput_type, Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Get_async_operation_params {
  client?: Client;
  id: string;
}

type Get_async_operation_return = AsyncApiCallOutput_type | Error_type;

export default async function get_async_operation({
  client,
  id,
}: Get_async_operation_params): Promise<Get_async_operation_return> {
  const url = `/async/operations/${id}`;
  const urlBase = process?.env?.BASE_URL || 'https://api.kittycad.io';
  const fullUrl = urlBase + url;
  const kittycadToken = client
    ? client.token
    : process.env.KITTYCAD_TOKEN || '';
  const headers = {
    Authorization: `Bearer ${kittycadToken}`,
  };
  const fetchOptions = {
    method: 'GET',
    headers,
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as Get_async_operation_return;
  return result;
}
