import fetch from 'node-fetch';
import { Error_type } from '../../models.js';

type Device_auth_confirm_return = Error_type;

export default async function device_auth_confirm(): Promise<Device_auth_confirm_return> {
  const url = `/oauth2/device/confirm`;
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
  const result = (await response.json()) as Device_auth_confirm_return;
  return result;
}
