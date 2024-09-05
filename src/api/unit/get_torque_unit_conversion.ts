import {
  UnitTorqueConversion_type,
  Error_type,
  UnitTorque_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Get_torque_unit_conversion_params {
  client?: Client;
  input_unit: UnitTorque_type;
  output_unit: UnitTorque_type;
  value: number;
}

type Get_torque_unit_conversion_return = UnitTorqueConversion_type | Error_type;

export default async function get_torque_unit_conversion({
  client,
  input_unit,
  output_unit,
  value,
}: Get_torque_unit_conversion_params): Promise<Get_torque_unit_conversion_return> {
  const url = `/unit/conversion/torque/${input_unit}/${output_unit}?value=${value}`;
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
  const result = (await response.json()) as Get_torque_unit_conversion_return;
  return result;
}
