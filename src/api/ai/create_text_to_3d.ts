import fetch from 'node-fetch';
import { Mesh_type, Error_type, FileExportFormat_type } from '../../models.js';
import { Client } from '../../client.js';

interface Create_text_to_3d_params {
  client?: Client;
  output_format: FileExportFormat_type;
  prompt: string;
}

type Create_text_to_3d_return = Mesh_type | Error_type;

export default async function create_text_to_3d({
  client,
  output_format,
  prompt,
}: Create_text_to_3d_params): Promise<Create_text_to_3d_return> {
  const url = `/ai/text-to-3d/${output_format}?prompt=${prompt}`;
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
  const result = (await response.json()) as Create_text_to_3d_return;
  return result;
}
