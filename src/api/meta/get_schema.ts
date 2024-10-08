import { Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Get_schema_params {
  client?: Client;
}

type Get_schema_return = Error_type;

export default async function get_schema({
  client,
}: Get_schema_params = {}): Promise<Get_schema_return> {
  const url = `/`;
  const urlBase = process?.env?.BASE_URL || 'https://api.zoo.dev';
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
  const result = (await response.json()) as Get_schema_return;
  return result;
}
