import { Error_type, UpdateShortlinkRequest_type } from '../../models.js';
import { Client } from '../../client.js';

interface Update_user_shortlink_params {
  client?: Client;
  key: string;
  body: UpdateShortlinkRequest_type;
}

type Update_user_shortlink_return = Error_type;

export default async function update_user_shortlink({
  client,
  key,
  body,
}: Update_user_shortlink_params): Promise<Update_user_shortlink_return> {
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
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as Update_user_shortlink_return;
  return result;
}
