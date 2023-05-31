import fetch from 'node-fetch';
import { Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Get_openai_schema_params {
  client?: Client;
}

type Get_openai_schema_return = Error_type;

export default async function get_openai_schema({
  client,
}: Get_openai_schema_params = {}): Promise<Get_openai_schema_return> {
  const url = `/openai/openapi.json`;
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
  const result = (await response.json()) as Get_openai_schema_return;
  return result;
}
