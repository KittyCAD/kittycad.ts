import fetch from 'node-fetch';
import { ModelingOutcomes_type, Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Cmd_batch_params {
  client?: Client;
}

type Cmd_batch_return = ModelingOutcomes_type | Error_type;

export default async function cmd_batch({
  client,
}: Cmd_batch_params = {}): Promise<Cmd_batch_return> {
  const url = `/modeling/cmd_batch`;
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
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as Cmd_batch_return;
  return result;
}
