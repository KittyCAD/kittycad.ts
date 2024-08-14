import {
  FileDensity_type,
  Error_type,
  UnitMass_type,
  UnitDensity_type,
  FileImportFormat_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Create_file_density_params {
  client?: Client;
  material_mass: number;
  material_mass_unit: UnitMass_type;
  output_unit: UnitDensity_type;
  src_format: FileImportFormat_type;
  body: string;
}

type Create_file_density_return = FileDensity_type | Error_type;

export default async function create_file_density({
  client,
  material_mass,
  material_mass_unit,
  output_unit,
  src_format,
  body,
}: Create_file_density_params): Promise<Create_file_density_return> {
  const url = `/file/density?material_mass=${material_mass}&material_mass_unit=${material_mass_unit}&output_unit=${output_unit}&src_format=${src_format}`;
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
  const result = (await response.json()) as Create_file_density_return;
  return result;
}
