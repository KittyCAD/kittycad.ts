import {} from '../../models.js';
import { Client } from '../../client.js';

interface Device_auth_request_params {
  client?: Client;
}

type Device_auth_request_return = any;

export default async function device_auth_request({
  client,
}: Device_auth_request_params = {}): Promise<Device_auth_request_return> {
  const url = `/oauth2/device/auth`;
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
  const result = (await response.json()) as Device_auth_request_return;
  return result;
}
