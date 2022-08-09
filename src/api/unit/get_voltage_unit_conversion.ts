import fetch from 'node-fetch';
import {
  UnitVoltageConversion_type,
  Error_type,
  UnitVoltageFormat_type,
} from '../../models.js';

interface Get_voltage_unit_conversion_params {
  output_format: UnitVoltageFormat_type;
  src_format: UnitVoltageFormat_type;
  value: number;
}

type Get_voltage_unit_conversion_return =
  | UnitVoltageConversion_type
  | Error_type;

export default async function get_voltage_unit_conversion({
  output_format,
  src_format,
  value,
}: Get_voltage_unit_conversion_params): Promise<Get_voltage_unit_conversion_return> {
  const url = `/unit/conversion/voltage/${src_format}/${output_format}?value=${value}`;
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
  const result = (await response.json()) as Get_voltage_unit_conversion_return;
  return result;
}
