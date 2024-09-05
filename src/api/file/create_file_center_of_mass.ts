import {
  FileCenterOfMass_type,
  Error_type,
  UnitLength_type,
  FileImportFormat_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Create_file_center_of_mass_params {
  client?: Client;
  output_unit: UnitLength_type;
  src_format: FileImportFormat_type;
  body: string;
}

type Create_file_center_of_mass_return = FileCenterOfMass_type | Error_type;

export default async function create_file_center_of_mass({
  client,
  output_unit,
  src_format,
  body,
}: Create_file_center_of_mass_params): Promise<Create_file_center_of_mass_return> {
  const url = `/file/center-of-mass?output_unit=${output_unit}&src_format=${src_format}`;
  const urlBase = process?.env?.BASE_URL || 'https://api.zoo.dev';
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
  const result = (await response.json()) as Create_file_center_of_mass_return;
  return result;
}
