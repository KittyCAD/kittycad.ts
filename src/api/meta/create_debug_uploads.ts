import { Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Create_debug_uploads_params {
  client?: Client;
}

type Create_debug_uploads_return = Error_type;

export default async function create_debug_uploads({
  client,
}: Create_debug_uploads_params = {}): Promise<Create_debug_uploads_return> {
  const url = `/debug/uploads`;
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
  const result = (await response.json()) as Create_debug_uploads_return;
  return result;
}
