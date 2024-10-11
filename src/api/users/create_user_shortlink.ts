import {
  CreateShortlinkResponse_type,
  Error_type,
  CreateShortlinkRequest_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Create_user_shortlink_params {
  client?: Client;
  body: CreateShortlinkRequest_type;
}

type Create_user_shortlink_return = CreateShortlinkResponse_type | Error_type;

export default async function create_user_shortlink({
  client,
  body,
}: Create_user_shortlink_params): Promise<Create_user_shortlink_return> {
  const url = `/user/shortlinks`;
  const urlBase = process?.env?.BASE_URL || 'https://api.zoo.dev';
  const fullUrl = urlBase + url;
  const kittycadToken = client
    ? client.token
    : process.env.KITTYCAD_TOKEN || '';
  const headers = {
    Authorization: `Bearer ${kittycadToken}`,
  };
  const fetchOptions = {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as Create_user_shortlink_return;
  return result;
}
