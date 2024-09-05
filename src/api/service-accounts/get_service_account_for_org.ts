import { ServiceAccount_type, Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Get_service_account_for_org_params {
  client?: Client;
  token: string;
}

type Get_service_account_for_org_return = ServiceAccount_type | Error_type;

export default async function get_service_account_for_org({
  client,
  token,
}: Get_service_account_for_org_params): Promise<Get_service_account_for_org_return> {
  const url = `/org/service-accounts/${token}`;
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
  const result = (await response.json()) as Get_service_account_for_org_return;
  return result;
}
