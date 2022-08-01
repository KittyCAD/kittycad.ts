import fetch from 'node-fetch';
import { FileConversion_type, Error_type } from '../../models.js';

interface Create_file_conversion_params {
  output_format: string;
  src_format: string;
  body: string;
}

type Create_file_conversion_return = FileConversion_type | Error_type;

export default async function create_file_conversion({
  output_format,
  src_format,
  body,
}: Create_file_conversion_params): Promise<Create_file_conversion_return> {
  const url = `/file/conversion/${src_format}/${output_format}`;
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
  const result = (await response.json()) as Create_file_conversion_return;
  return result;
}
