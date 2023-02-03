import fetch from 'node-fetch';
import {
  FileMass_type,
  Error_type,
  File3DImportFormat_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Create_file_mass_params {
  client?: Client;
  material_density: number;
  src_format: File3DImportFormat_type;
  body: string;
}

type Create_file_mass_return = FileMass_type | Error_type;

export default async function create_file_mass({
  client,
  material_density,
  src_format,
  body,
}: Create_file_mass_params): Promise<Create_file_mass_return> {
  const url = `/file/mass?material_density=${material_density}&src_format=${src_format}`;
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
  const result = (await response.json()) as Create_file_mass_return;
  return result;
}
