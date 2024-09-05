import { Error_type, DeviceAuthVerifyParams_type } from '../../models.js';
import { Client } from '../../client.js';

interface Device_auth_confirm_params {
  client?: Client;
  body: DeviceAuthVerifyParams_type;
}

type Device_auth_confirm_return = Error_type;

export default async function device_auth_confirm({
  client,
  body,
}: Device_auth_confirm_params): Promise<Device_auth_confirm_return> {
  const url = `/oauth2/device/confirm`;
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
    body: JSON.stringify(body),
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as Device_auth_confirm_return;
  return result;
}
