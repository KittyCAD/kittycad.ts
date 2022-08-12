import fetch from 'node-fetch';
import {
  UnitTemperatureConversion_type,
  Error_type,
  UnitTemperatureFormat_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Get_temperature_unit_conversion_params {
  client?: Client;
  output_format: UnitTemperatureFormat_type;
  src_format: UnitTemperatureFormat_type;
  value: number;
}

type Get_temperature_unit_conversion_return =
  | UnitTemperatureConversion_type
  | Error_type;

export default async function get_temperature_unit_conversion({
  client,
  output_format,
  src_format,
  value,
}: Get_temperature_unit_conversion_params): Promise<Get_temperature_unit_conversion_return> {
  const url = `/unit/conversion/temperature/${src_format}/${output_format}?value=${value}`;
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
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result =
    (await response.json()) as Get_temperature_unit_conversion_return;
  return result;
}
