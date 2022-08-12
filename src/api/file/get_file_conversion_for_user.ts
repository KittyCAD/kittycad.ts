import fetch from 'node-fetch';
import { AsyncApiCallOutput_type, Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Get_file_conversion_for_user_params {
  client?: Client;
  id: string;
}

type Get_file_conversion_for_user_return = AsyncApiCallOutput_type | Error_type;

export default async function get_file_conversion_for_user({
  client,
  id,
}: Get_file_conversion_for_user_params): Promise<Get_file_conversion_for_user_return> {
  const url = `/user/file/conversions/${id}`;
  const fullUrl = 'https://api.kittycad.io' + url;
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
  const result = (await response.json()) as Get_file_conversion_for_user_return;
  return result;
}
