import fetch from 'node-fetch';
import { Error_type } from '../../models.js';

interface Device_auth_verify_params {
  user_code: string;
}

type Device_auth_verify_return = Error_type;

export default async function device_auth_verify({
  user_code,
}: Device_auth_verify_params): Promise<Device_auth_verify_return> {
  const url = `/oauth2/device/verify?user_code=${user_code}`;
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
  const result = (await response.json()) as Device_auth_verify_return;
  return result;
}
