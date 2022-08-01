import fetch from 'node-fetch';
import {} from '../../models.js';

type Device_access_token_return = any;

export default async function device_access_token(): Promise<Device_access_token_return> {
  const url = `/oauth2/device/token`;
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
  const result = (await response.json()) as Device_access_token_return;
  return result;
}
