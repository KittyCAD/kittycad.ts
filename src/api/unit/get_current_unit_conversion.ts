import {
  UnitCurrentConversion_type,
  Error_type,
  UnitCurrent_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Get_current_unit_conversion_params {
  client?: Client;
  input_unit: UnitCurrent_type;
  output_unit: UnitCurrent_type;
  value: number;
}

type Get_current_unit_conversion_return =
  | UnitCurrentConversion_type
  | Error_type;

export default async function get_current_unit_conversion({
  client,
  input_unit,
  output_unit,
  value,
}: Get_current_unit_conversion_params): Promise<Get_current_unit_conversion_return> {
  const url = `/unit/conversion/current/${input_unit}/${output_unit}?value=${value}`;
  const urlBase = process?.env?.BASE_URL || 'https://api.zoo.dev';
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
  const result = (await response.json()) as Get_current_unit_conversion_return;
  return result;
}
