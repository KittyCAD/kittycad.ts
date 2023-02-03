import fetch from 'node-fetch';
import { ApiToken_type, Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Get_api_token_for_user_params {
  client?: Client;
  token: string;
}

type Get_api_token_for_user_return = ApiToken_type | Error_type;

export default async function get_api_token_for_user({
  client,
  token,
}: Get_api_token_for_user_params): Promise<Get_api_token_for_user_return> {
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
    method: 'GET',
    headers,
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as Get_api_token_for_user_return;
  return result;
}
