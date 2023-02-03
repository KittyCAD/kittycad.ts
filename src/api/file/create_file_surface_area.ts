import fetch from 'node-fetch';
import {
  FileSurfaceArea_type,
  Error_type,
  File3DImportFormat_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Create_file_surface_area_params {
  client?: Client;
  src_format: File3DImportFormat_type;
  body: string;
}

type Create_file_surface_area_return = FileSurfaceArea_type | Error_type;

export default async function create_file_surface_area({
  client,
  src_format,
  body,
}: Create_file_surface_area_params): Promise<Create_file_surface_area_return> {
  const url = `/file/surface-area?src_format=${src_format}`;
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
  const result = (await response.json()) as Create_file_surface_area_return;
  return result;
}
