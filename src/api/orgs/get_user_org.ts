import { UserOrgInfo_type, Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Get_user_org_params {
  client?: Client;
}

type Get_user_org_return = UserOrgInfo_type | Error_type;

export default async function get_user_org({
  client,
}: Get_user_org_params = {}): Promise<Get_user_org_return> {
  const url = `/user/org`;
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
  const result = (await response.json()) as Get_user_org_return;
  return result;
}
