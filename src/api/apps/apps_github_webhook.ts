import fetch from 'node-fetch';
import { Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Apps_github_webhook_params {
  client?: Client;
  body: string;
}

type Apps_github_webhook_return = Error_type;

export default async function apps_github_webhook({
  client,
  body,
}: Apps_github_webhook_params): Promise<Apps_github_webhook_return> {
  const url = `/apps/github/webhook`;
  const urlBase = process?.env?.BASE_URL || 'https://api.kittycad.io';
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
    body,
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as Apps_github_webhook_return;
  return result;
}
