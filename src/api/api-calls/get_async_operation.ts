import fetch from 'node-fetch';
import { AsyncApiCallOutput_type, Error_type } from '../../models.js';

interface Get_async_operation_params {
  id: string;
}

type Get_async_operation_return = AsyncApiCallOutput_type | Error_type;

export default async function get_async_operation({
  id,
}: Get_async_operation_params): Promise<Get_async_operation_return> {
  const url = `/async/operations/${id}`;
  const fullUrl = 'https://api.kittycad.io' + url;
  const kittycadToken = process.env.KITTYCAD_TOKEN || '';
  const headers = {
    Authorization: `Bearer ${kittycadToken}`,
  };
  const fetchOptions = {
    method: 'POST',
    headers,
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as Get_async_operation_return;
  return result;
}
