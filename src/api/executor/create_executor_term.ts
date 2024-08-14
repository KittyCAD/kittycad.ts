import {} from '../../models.js';
import { Client } from '../../client.js';

interface Create_executor_term_params {
  client?: Client;
}

type Create_executor_term_return = any;

export default async function create_executor_term({
  client,
}: Create_executor_term_params = {}): Promise<Create_executor_term_return> {
  const url = `/ws/executor/term`;
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
  const result = (await response.json()) as Create_executor_term_return;
  return result;
}
