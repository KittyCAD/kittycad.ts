import fetch from 'node-fetch';
import {} from '../../models.js';
import { Client } from '../../client.js';

interface Modeling_commands_ws_params {
  client?: Client;
}

type Modeling_commands_ws_return = any;

export default async function modeling_commands_ws({
  client,
}: Modeling_commands_ws_params = {}): Promise<Modeling_commands_ws_return> {
  const url = `/ws/modeling/commands`;
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
  const result = (await response.json()) as Modeling_commands_ws_return;
  return result;
}
