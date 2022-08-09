import fetch from 'node-fetch';
import {
  UnitTimeConversion_type,
  Error_type,
  UnitTimeFormat_type,
} from '../../models.js';

interface Get_time_unit_conversion_params {
  output_format: UnitTimeFormat_type;
  src_format: UnitTimeFormat_type;
  value: number;
}

type Get_time_unit_conversion_return = UnitTimeConversion_type | Error_type;

export default async function get_time_unit_conversion({
  output_format,
  src_format,
  value,
}: Get_time_unit_conversion_params): Promise<Get_time_unit_conversion_return> {
  const url = `/unit/conversion/time/${src_format}/${output_format}?value=${value}`;
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
  const result = (await response.json()) as Get_time_unit_conversion_return;
  return result;
}
