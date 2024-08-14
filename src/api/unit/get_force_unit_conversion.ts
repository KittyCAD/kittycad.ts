import {
  UnitForceConversion_type,
  Error_type,
  UnitForce_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Get_force_unit_conversion_params {
  client?: Client;
  input_unit: UnitForce_type;
  output_unit: UnitForce_type;
  value: number;
}

type Get_force_unit_conversion_return = UnitForceConversion_type | Error_type;

export default async function get_force_unit_conversion({
  client,
  input_unit,
  output_unit,
  value,
}: Get_force_unit_conversion_params): Promise<Get_force_unit_conversion_return> {
  const url = `/unit/conversion/force/${input_unit}/${output_unit}?value=${value}`;
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
  const result = (await response.json()) as Get_force_unit_conversion_return;
  return result;
}
