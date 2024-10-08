import { AccountProvider_type, Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Get_oauth2_providers_for_user_params {
  client?: Client;
}

type Get_oauth2_providers_for_user_return = AccountProvider_type[] | Error_type;

export default async function get_oauth2_providers_for_user({
  client,
}: Get_oauth2_providers_for_user_params = {}): Promise<Get_oauth2_providers_for_user_return> {
  const url = `/user/oauth2/providers`;
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
  const result =
    (await response.json()) as Get_oauth2_providers_for_user_return;
  return result;
}
