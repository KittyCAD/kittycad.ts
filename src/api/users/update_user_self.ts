import fetch from 'node-fetch';
import { User_type, Error_type, UpdateUser_type } from '../../models.js';
import { Client } from '../../client.js';

interface Update_user_self_params {
  client?: Client;
  body: UpdateUser_type;
}

type Update_user_self_return = User_type | Error_type;

export default async function update_user_self({
  client,
  body,
}: Update_user_self_params): Promise<Update_user_self_return> {
  const url = `/user`;
  const urlBase = process?.env?.BASE_URL || 'https://api.kittycad.io';
  const fullUrl = urlBase + url;
  const kittycadToken = client
    ? client.token
    : process.env.KITTYCAD_TOKEN || '';
  const headers = {
    Authorization: `Bearer ${kittycadToken}`,
  };
  const fetchOptions = {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as Update_user_self_return;
  return result;
}
