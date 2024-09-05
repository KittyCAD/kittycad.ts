import {
  FileVolume_type,
  Error_type,
  UnitVolume_type,
  FileImportFormat_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Create_file_volume_params {
  client?: Client;
  output_unit: UnitVolume_type;
  src_format: FileImportFormat_type;
  body: string;
}

type Create_file_volume_return = FileVolume_type | Error_type;

export default async function create_file_volume({
  client,
  output_unit,
  src_format,
  body,
}: Create_file_volume_params): Promise<Create_file_volume_return> {
  const url = `/file/volume?output_unit=${output_unit}&src_format=${src_format}`;
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
  const result = (await response.json()) as Create_file_volume_return;
  return result;
}
