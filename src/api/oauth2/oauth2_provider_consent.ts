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
  const result = (await response.json()) as Oauth2_provider_consent_return;
  return result;
}
