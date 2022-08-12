import fetch from 'node-fetch';
import { Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Delete_user_self_params {
  client?: Client;
}

type Delete_user_self_return = Error_type;

export default async function delete_user_self({
  client,
}: Delete_user_self_params = {}): Promise<Delete_user_self_return> {
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
  const result = (await response.json()) as Delete_user_self_return;
  return result;
}
