import fetch from 'node-fetch';
import { Pong_type, Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Ping_params {
  client?: Client;
}

type Ping_return = Pong_type | Error_type;

export default async function ping({
  client,
}: Ping_params = {}): Promise<Ping_return> {
  const url = `/ping`;
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
  const result = (await response.json()) as Ping_return;
  return result;
}
