import fetch from 'node-fetch';
import { Error_type, AccountProvider_type } from '../../models.js';
import { Client } from '../../client.js';

interface Oauth2_provider_callback_params {
  client?: Client;
  provider: AccountProvider_type;
  code: string;
  state: string;
}

type Oauth2_provider_callback_return = Error_type;

export default async function oauth2_provider_callback({
  client,
  provider,
  code,
  state,
}: Oauth2_provider_callback_params): Promise<Oauth2_provider_callback_return> {
  const url = `/oauth2/provider/${provider}/callback?code=${code}&state=${state}`;
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
  const result = (await response.json()) as Oauth2_provider_callback_return;
  return result;
}
