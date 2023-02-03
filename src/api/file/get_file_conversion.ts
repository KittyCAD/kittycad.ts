import fetch from 'node-fetch';
import { AsyncApiCallOutput_type, Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Get_file_conversion_params {
  client?: Client;
  id: string;
}

type Get_file_conversion_return = AsyncApiCallOutput_type | Error_type;

export default async function get_file_conversion({
  client,
  id,
}: Get_file_conversion_params): Promise<Get_file_conversion_return> {
  const url = `/file/conversions/${id}`;
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
  const result = (await response.json()) as Get_file_conversion_return;
  return result;
}
