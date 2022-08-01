import fetch from 'node-fetch';
import { AsyncApiCallOutput_type, Error_type } from '../../models.js';

interface Get_file_conversion_params {
  id: string;
}

type Get_file_conversion_return = AsyncApiCallOutput_type | Error_type;

export default async function get_file_conversion({
  id,
}: Get_file_conversion_params): Promise<Get_file_conversion_return> {
  const url = `/file/conversions/${id}`;
  const fullUrl = 'https://api.kittycad.io' + url;
  const kittycadToken = process.env.KITTYCAD_TOKEN || '';
  const headers = {
    Authorization: `Bearer ${kittycadToken}`,
  };
  const fetchOptions = {
    method: 'POST',
    headers,
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as Get_file_conversion_return;
  return result;
}
