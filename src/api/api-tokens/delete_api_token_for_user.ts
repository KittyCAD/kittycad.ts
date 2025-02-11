import { Error_type, ApiTokenUuid_type } from '../../models.js';
import { Client } from '../../client.js';

interface Delete_api_token_for_user_params {
  client?: Client;
  token: ApiTokenUuid_type;
}

type Delete_api_token_for_user_return = Error_type;

export default async function delete_api_token_for_user({
  client,
  token,
}: Delete_api_token_for_user_params): Promise<Delete_api_token_for_user_return> {
  const url = `/user/api-tokens/${token}`;
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
  };
  const fetchOptions = {
    method: 'DELETE',
    headers,
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as Delete_api_token_for_user_return;
  return result;
}
