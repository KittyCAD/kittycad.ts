import fetch from 'node-fetch';
import {} from '../../models.js';

type Device_auth_request_return = any;

export default async function device_auth_request(): Promise<Device_auth_request_return> {
  const url = `/oauth2/device/auth`;
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
  const result = (await response.json()) as Device_auth_request_return;
  return result;
}
