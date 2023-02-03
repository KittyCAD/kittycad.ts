import fetch from 'node-fetch';
import {
  UnitPressureConversion_type,
  Error_type,
  UnitPressureFormat_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Get_pressure_unit_conversion_params {
  client?: Client;
  output_format: UnitPressureFormat_type;
  src_format: UnitPressureFormat_type;
  value: number;
}

type Get_pressure_unit_conversion_return =
  | UnitPressureConversion_type
  | Error_type;

export default async function get_pressure_unit_conversion({
  client,
  output_format,
  src_format,
  value,
}: Get_pressure_unit_conversion_params): Promise<Get_pressure_unit_conversion_return> {
  const url = `/unit/conversion/pressure/${src_format}/${output_format}?value=${value}`;
  const urlBase = process?.env?.BASE_URL || 'https://api.kittycad.io';
  const fullUrl = urlBase + url;
  const kittycadToken = client
    ? client.token
    : process.env.KITTYCAD_TOKEN || '';
  const headers = {
    Authorization: `Bearer ${kittycadToken}`,
  };
  const fetchOptions = {
    method: 'GET',
    headers,
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as Get_pressure_unit_conversion_return;
  return result;
}
