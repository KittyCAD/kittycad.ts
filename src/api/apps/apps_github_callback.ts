import { Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Apps_github_callback_params {
  client?: Client;
}

type Apps_github_callback_return = Error_type;

export default async function apps_github_callback({
  client,
}: Apps_github_callback_params = {}): Promise<Apps_github_callback_return> {
  const url = `/apps/github/callback`;
  const urlBase = process?.env?.BASE_URL || 'https://api.kittycad.io';
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
  const result = (await response.json()) as Apps_github_callback_return;
  return result;
}
