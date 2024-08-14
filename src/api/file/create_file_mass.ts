import {
  FileMass_type,
  Error_type,
  UnitDensity_type,
  UnitMass_type,
  FileImportFormat_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Create_file_mass_params {
  client?: Client;
  material_density: number;
  material_density_unit: UnitDensity_type;
  output_unit: UnitMass_type;
  src_format: FileImportFormat_type;
  body: string;
}

type Create_file_mass_return = FileMass_type | Error_type;

export default async function create_file_mass({
  client,
  material_density,
  material_density_unit,
  output_unit,
  src_format,
  body,
}: Create_file_mass_params): Promise<Create_file_mass_return> {
  const url = `/file/mass?material_density=${material_density}&material_density_unit=${material_density_unit}&output_unit=${output_unit}&src_format=${src_format}`;
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
