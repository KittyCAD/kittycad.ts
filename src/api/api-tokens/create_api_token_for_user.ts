import { ApiToken_type, Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Create_api_token_for_user_params {
  client?: Client;
  label: string;
}

type Create_api_token_for_user_return = ApiToken_type | Error_type;

export default async function create_api_token_for_user({
  client,
  label,
}: Create_api_token_for_user_params): Promise<Create_api_token_for_user_return> {
  const url = `/user/api-tokens?label=${label}`;
  const urlBase = process?.env?.BASE_URL || 'https://api.kittycad.io';
  const fullUrl = urlBase + url;
  const kittycadToken = client
    ? client.token
    : process.env.KITTYCAD_TOKEN || '';
  const headers = {
    Authorization: `Bearer ${kittycadToken}`,
  };
  const fetchOptions = {
    method: 'POST',
    headers,
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as Create_api_token_for_user_return;
  return result;
}
