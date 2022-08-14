import fetch from 'node-fetch';
import {
  FileCenterOfMass_type,
  Error_type,
  FileSourceFormat_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Create_file_center_of_mass_params {
  client?: Client;
  material_density: number;
  src_format: FileSourceFormat_type;
  body: string;
}

type Create_file_center_of_mass_return = FileCenterOfMass_type | Error_type;

export default async function create_file_center_of_mass({
  client,
  material_density,
  src_format,
  body,
}: Create_file_center_of_mass_params): Promise<Create_file_center_of_mass_return> {
  const url = `/file/center-of-mass?material_density=${material_density}&src_format=${src_format}`;
  const fullUrl = 'https://api.kittycad.io' + url;
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
  const result = (await response.json()) as Create_file_center_of_mass_return;
  return result;
}