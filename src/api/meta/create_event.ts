import { Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Create_event_params {
  client?: Client;
}

type Create_event_return = Error_type;

export default async function create_event({
  client,
}: Create_event_params = {}): Promise<Create_event_return> {
  const url = `/events`;
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
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as Create_event_return;
  return result;
}
