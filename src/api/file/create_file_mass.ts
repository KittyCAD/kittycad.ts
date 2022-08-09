import fetch from 'node-fetch';
import {
  FileMass_type,
  Error_type,
  FileSourceFormat_type,
} from '../../models.js';

interface Create_file_mass_params {
  material_density: number;
  src_format: FileSourceFormat_type;
  body: string;
}

type Create_file_mass_return = FileMass_type | Error_type;

export default async function create_file_mass({
  material_density,
  src_format,
  body,
}: Create_file_mass_params): Promise<Create_file_mass_return> {
  const url = `/file/mass?material_density=${material_density}&src_format=${src_format}`;
  const fullUrl = 'https://api.kittycad.io' + url;
  const kittycadToken = process.env.KITTYCAD_TOKEN || '';
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
