import {
  UnitPowerConversion_type,
  Error_type,
  UnitPower_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Get_power_unit_conversion_params {
  client?: Client;
  input_unit: UnitPower_type;
  output_unit: UnitPower_type;
  value: number;
}

type Get_power_unit_conversion_return = UnitPowerConversion_type | Error_type;

export default async function get_power_unit_conversion({
  client,
  input_unit,
  output_unit,
  value,
}: Get_power_unit_conversion_params): Promise<Get_power_unit_conversion_return> {
  const url = `/unit/conversion/power/${input_unit}/${output_unit}?value=${value}`;
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
  const result = (await response.json()) as Get_power_unit_conversion_return;
  return result;
}
