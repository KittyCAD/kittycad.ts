import fetch from 'node-fetch';
import { FileDensity_type, Error_type } from '../../models.js';

interface Create_file_density_params {
  material_mass: string;
  src_format: string;
  body: string;
}

type Create_file_density_return = FileDensity_type | Error_type;

export default async function create_file_density({
  material_mass,
  src_format,
  body,
}: Create_file_density_params): Promise<Create_file_density_return> {
  const url = `/file/density?material_mass=${material_mass}&src_format=${src_format}`;
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
  const result = (await response.json()) as Create_file_density_return;
  return result;
}
