import fetch from 'node-fetch';
import {
  File3DConversion_type,
  Error_type,
  File3DExportFormat_type,
  File3DImportFormat_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Create_file_3d_conversion_params {
  client?: Client;
  output_format: File3DExportFormat_type;
  src_format: File3DImportFormat_type;
  body: string;
}

type Create_file_3d_conversion_return = File3DConversion_type | Error_type;

export default async function create_file_3d_conversion({
  client,
  output_format,
  src_format,
  body,
}: Create_file_3d_conversion_params): Promise<Create_file_3d_conversion_return> {
  const url = `/file/3d/conversion/${src_format}/${output_format}`;
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
  const result = (await response.json()) as Create_file_3d_conversion_return;
  return result;
}
