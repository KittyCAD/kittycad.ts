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
  // Backwards compatible for the BASE_URL env variable
  // That used to exist in only this lib, ZOO_HOST exists in the all the other
  // sdks and the CLI.
  const urlBase =
    process?.env?.ZOO_HOST || process?.env?.BASE_URL || 'https://api.zoo.dev';
  const fullUrl = urlBase + url;
  // The other sdks use to use KITTYCAD_API_TOKEN, now they still do for
  // backwards compatibility, but the new standard is ZOO_API_TOKEN.
  // For some reason only this lib supported KITTYCAD_TOKEN, so we need to
  // check for that as well.
  const kittycadToken = client
    ? client.token
    : process.env.KITTYCAD_TOKEN ||
      process.env.KITTYCAD_API_TOKEN ||
      process.env.ZOO_API_TOKEN ||
      '';
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
