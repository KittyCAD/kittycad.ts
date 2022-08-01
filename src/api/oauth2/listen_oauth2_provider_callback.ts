import fetch from 'node-fetch';
import { Error_type } from '../../models.js';

interface Listen_oauth2_provider_callback_params {
  provider: string;
  code: string;
  state: string;
}

type Listen_oauth2_provider_callback_return = Error_type;

export default async function listen_oauth2_provider_callback({
  provider,
  code,
  state,
}: Listen_oauth2_provider_callback_params): Promise<Listen_oauth2_provider_callback_return> {
  const url = `/oauth2/provider/${provider}/callback?code=${code}&state=${state}`;
  const fullUrl = 'https://api.kittycad.io' + url;
  const kittycadToken = process.env.KITTYCAD_TOKEN || '';
  const headers = {
    Authorization: `Bearer ${kittycadToken}`,
  };
  const fetchOptions = {
    method: 'POST',
    headers,
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result =
    (await response.json()) as Listen_oauth2_provider_callback_return;
  return result;
}
