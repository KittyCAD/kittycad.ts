import fetch from 'node-fetch';
import {
  Mesh_type,
  Error_type,
  ImageType_type,
  FileExportFormat_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Create_image_to_3d_params {
  client?: Client;
  input_format: ImageType_type;
  output_format: FileExportFormat_type;
  body: string;
}

type Create_image_to_3d_return = Mesh_type | Error_type;

export default async function create_image_to_3d({
  client,
  input_format,
  output_format,
  body,
}: Create_image_to_3d_params): Promise<Create_image_to_3d_return> {
  const url = `/ai/image-to-3d/${input_format}/${output_format}`;
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
  const result = (await response.json()) as Create_image_to_3d_return;
  return result;
}
