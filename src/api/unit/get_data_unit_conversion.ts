import fetch from 'node-fetch';
import {
  UnitDataConversion_type,
  Error_type,
  UnitDataFormat_type,
} from '../../models.js';

interface Get_data_unit_conversion_params {
  output_format: UnitDataFormat_type;
  src_format: UnitDataFormat_type;
  value: number;
}

type Get_data_unit_conversion_return = UnitDataConversion_type | Error_type;

export default async function get_data_unit_conversion({
  output_format,
  src_format,
  value,
}: Get_data_unit_conversion_params): Promise<Get_data_unit_conversion_return> {
  const url = `/unit/conversion/data/${src_format}/${output_format}?value=${value}`;
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
  const result = (await response.json()) as Get_data_unit_conversion_return;
  return result;
}
