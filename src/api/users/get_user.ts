import { User_type, Error_type, UserIdentifier_type } from '../../models.js';
import { Client } from '../../client.js';

interface Get_user_params {
  client?: Client;
  id: UserIdentifier_type;
}

type Get_user_return = User_type | Error_type;

export default async function get_user({
  client,
  id,
}: Get_user_params): Promise<Get_user_return> {
  const url = `/users/${id}`;
  const urlBase = process?.env?.BASE_URL || 'https://api.zoo.dev';
  const fullUrl = urlBase + url;
  const kittycadToken = client
    ? client.token
    : process.env.KITTYCAD_TOKEN || '';
  const headers = {
    Authorization: `Bearer ${kittycadToken}`,
  };
  const fetchOptions = {
    method: 'GET',
    headers,
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as Get_user_return;
  return result;
}
