import { Metadata_type, Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Get_metadata_params {
  client?: Client;
}

type Get_metadata_return = Metadata_type | Error_type;

export default async function get_metadata({
  client,
}: Get_metadata_params = {}): Promise<Get_metadata_return> {
  const url = `/_meta/info`;
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
  const result = (await response.json()) as Get_metadata_return;
  return result;
}
