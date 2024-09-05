import {} from '../../models.js';
import { Client } from '../../client.js';

interface Oauth2_token_revoke_params {
  client?: Client;
}

type Oauth2_token_revoke_return = any;

export default async function oauth2_token_revoke({
  client,
}: Oauth2_token_revoke_params = {}): Promise<Oauth2_token_revoke_return> {
  const url = `/oauth2/token/revoke`;
  const urlBase = process?.env?.BASE_URL || 'https://api.zoo.dev';
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
  const result = (await response.json()) as Oauth2_token_revoke_return;
  return result;
}
