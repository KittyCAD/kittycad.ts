import {} from '../../models.js';
import { Client } from '../../client.js';

interface Device_access_token_params {
  client?: Client;
}

type Device_access_token_return = any;

export default async function device_access_token({
  client,
}: Device_access_token_params = {}): Promise<Device_access_token_return> {
  const url = `/oauth2/device/token`;
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
  const result = (await response.json()) as Device_access_token_return;
  return result;
}
