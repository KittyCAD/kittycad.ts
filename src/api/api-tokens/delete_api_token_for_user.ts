import { Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Delete_api_token_for_user_params {
  client?: Client;
  token: string;
}

type Delete_api_token_for_user_return = Error_type;

export default async function delete_api_token_for_user({
  client,
  token,
}: Delete_api_token_for_user_params): Promise<Delete_api_token_for_user_return> {
  const url = `/user/api-tokens/${token}`;
  const urlBase = process?.env?.BASE_URL || 'https://api.kittycad.io';
  const fullUrl = urlBase + url;
  const kittycadToken = client
    ? client.token
    : process.env.KITTYCAD_TOKEN || '';
  const headers = {
    Authorization: `Bearer ${kittycadToken}`,
  };
  const fetchOptions = {
    method: 'DELETE',
    headers,
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as Delete_api_token_for_user_return;
  return result;
}
