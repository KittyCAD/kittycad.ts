import fetch from 'node-fetch';
import {
  File2DVectorConversion_type,
  Error_type,
  File2DVectorExportFormat_type,
  File2DVectorImportFormat_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Create_file_2d_vector_conversion_params {
  client?: Client;
  output_format: File2DVectorExportFormat_type;
  src_format: File2DVectorImportFormat_type;
  body: string;
}

type Create_file_2d_vector_conversion_return =
  | File2DVectorConversion_type
  | Error_type;

export default async function create_file_2d_vector_conversion({
  client,
  output_format,
  src_format,
  body,
}: Create_file_2d_vector_conversion_params): Promise<Create_file_2d_vector_conversion_return> {
  const url = `/file/2d/vector/conversion/${src_format}/${output_format}`;
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
  const result =
    (await response.json()) as Create_file_2d_vector_conversion_return;
  return result;
}
