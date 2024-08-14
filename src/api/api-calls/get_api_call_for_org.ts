import { ApiCallWithPrice_type, Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Get_api_call_for_org_params {
  client?: Client;
  id: string;
}

type Get_api_call_for_org_return = ApiCallWithPrice_type | Error_type;

export default async function get_api_call_for_org({
  client,
  id,
}: Get_api_call_for_org_params): Promise<Get_api_call_for_org_return> {
  const url = `/org/api-calls/${id}`;
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
  const result = (await response.json()) as Get_api_call_for_org_return;
  return result;
}
