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
  // Backwards compatible for the BASE_URL env variable
  // That used to exist in only this lib, ZOO_HOST exists in the all the other
  // sdks and the CLI.
  const urlBase =
    process?.env?.ZOO_HOST || process?.env?.BASE_URL || 'https://api.zoo.dev';
  const fullUrl = urlBase + url;
  // The other sdks use to use KITTYCAD_API_TOKEN, now they still do for
  // backwards compatibility, but the new standard is ZOO_API_TOKEN.
  // For some reason only this lib supported KITTYCAD_TOKEN, so we need to
  // check for that as well.
  const kittycadToken = client
    ? client.token || process.env.ZOO_API_TOKEN || ''
    : process.env.KITTYCAD_TOKEN ||
      process.env.KITTYCAD_API_TOKEN ||
      process.env.ZOO_API_TOKEN ||
      '';
  const headers = {
    Authorization: `Bearer ${kittycadToken}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  const fetchOptions = {
    method: 'POST',
    headers,
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as Oauth2_token_revoke_return;
  return result;
}
