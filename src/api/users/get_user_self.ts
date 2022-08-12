import fetch from 'node-fetch';
import { User_type, Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Get_user_self_params {
  client?: Client;
}

type Get_user_self_return = User_type | Error_type;

export default async function get_user_self({
  client,
}: Get_user_self_params = {}): Promise<Get_user_self_return> {
  const url = `/user`;
  const fullUrl = 'https://api.kittycad.io' + url;
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
  const result = (await response.json()) as Get_user_self_return;
  return result;
}
