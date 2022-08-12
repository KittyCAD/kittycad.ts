import fetch from 'node-fetch';
import {
  FileConversion_type,
  Error_type,
  FileOutputFormat_type,
  FileSourceFormat_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Create_file_conversion_params {
  client?: Client;
  output_format: FileOutputFormat_type;
  src_format: FileSourceFormat_type;
  body: string;
}

type Create_file_conversion_return = FileConversion_type | Error_type;

export default async function create_file_conversion({
  client,
  output_format,
  src_format,
  body,
}: Create_file_conversion_params): Promise<Create_file_conversion_return> {
  const url = `/file/conversion/${src_format}/${output_format}`;
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
  const result = (await response.json()) as Create_file_conversion_return;
  return result;
}
