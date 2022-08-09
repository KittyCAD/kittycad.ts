import fetch from 'node-fetch';
import {
  UnitPressureConversion_type,
  Error_type,
  UnitPressureFormat_type,
} from '../../models.js';

interface Get_pressure_unit_conversion_params {
  output_format: UnitPressureFormat_type;
  src_format: UnitPressureFormat_type;
  value: number;
}

type Get_pressure_unit_conversion_return =
  | UnitPressureConversion_type
  | Error_type;

export default async function get_pressure_unit_conversion({
  output_format,
  src_format,
  value,
}: Get_pressure_unit_conversion_params): Promise<Get_pressure_unit_conversion_return> {
  const url = `/unit/conversion/pressure/${src_format}/${output_format}?value=${value}`;
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
  const result = (await response.json()) as Get_pressure_unit_conversion_return;
  return result;
}
