import {
  OAuth2ClientInfo_type,
  Error_type,
  AccountProvider_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Oauth2_provider_consent_params {
  client?: Client;
  provider: AccountProvider_type;
  callback_url: string;
}

type Oauth2_provider_consent_return = OAuth2ClientInfo_type | Error_type;

export default async function oauth2_provider_consent({
  client,
  provider,
  callback_url,
}: Oauth2_provider_consent_params): Promise<Oauth2_provider_consent_return> {
  const url = `/oauth2/provider/${provider}/consent?callback_url=${callback_url}`;
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
    ? client.token
    : process.env.KITTYCAD_TOKEN ||
      process.env.KITTYCAD_API_TOKEN ||
      process.env.ZOO_API_TOKEN ||
      '';
  const headers = {
    Authorization: `Bearer ${kittycadToken}`,
  };
  const fetchOptions = {
    method: 'GET',
    headers,
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as Oauth2_provider_consent_return;
  return result;
}
