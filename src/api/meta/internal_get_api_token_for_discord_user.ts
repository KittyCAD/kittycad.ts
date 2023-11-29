import fetch from 'node-fetch';
import { ApiToken_type, Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Internal_get_api_token_for_discord_user_params {
  client?: Client;
  discord_id: string;
}

type Internal_get_api_token_for_discord_user_return =
  | ApiToken_type
  | Error_type;

export default async function internal_get_api_token_for_discord_user({
  client,
  discord_id,
}: Internal_get_api_token_for_discord_user_params): Promise<Internal_get_api_token_for_discord_user_return> {
  const url = `/internal/discord/api-token/${discord_id}`;
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
  const result =
    (await response.json()) as Internal_get_api_token_for_discord_user_return;
  return result;
}
