import { Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Delete_user_shortlink_params {
  client?: Client;
  key: string;
}

type Delete_user_shortlink_return = Error_type;

export default async function delete_user_shortlink({
  client,
  key,
}: Delete_user_shortlink_params): Promise<Delete_user_shortlink_return> {
  const url = `/user/shortlinks/${key}`;
  const urlBase = process?.env?.BASE_URL || 'https://api.zoo.dev';
  const fullUrl = urlBase + url;
  const kittycadToken = client
    ? client.token
    : process.env.KITTYCAD_TOKEN || '';
  const headers = {
    Authorization: `Bearer ${kittycadToken}`,
  };
  const fetchOptions = {
    method: 'DELETE',
    headers,
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as Delete_user_shortlink_return;
  return result;
}
