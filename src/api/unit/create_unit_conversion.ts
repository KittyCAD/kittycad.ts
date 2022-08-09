import fetch from 'node-fetch';
import { UnitConversion_type, Error_type } from '../../models.js';

interface Create_unit_conversion_params {
  output_format: string;
  src_format: string;
  value: number;
}

type Create_unit_conversion_return = UnitConversion_type | Error_type;

export default async function create_unit_conversion({
  output_format,
  src_format,
  value,
}: Create_unit_conversion_params): Promise<Create_unit_conversion_return> {
  const url = `/unit/conversion/${src_format}/${output_format}?value=${value}`;
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
  const result = (await response.json()) as Create_unit_conversion_return;
  return result;
}
