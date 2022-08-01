import fetch from 'node-fetch';
import { FileVolume_type, Error_type } from '../../models.js';

interface Create_file_volume_params {
  src_format: string;
  body: string;
}

type Create_file_volume_return = FileVolume_type | Error_type;

export default async function create_file_volume({
  src_format,
  body,
}: Create_file_volume_params): Promise<Create_file_volume_return> {
  const url = `/file/volume?src_format=${src_format}`;
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
  const result = (await response.json()) as Create_file_volume_return;
  return result;
}
