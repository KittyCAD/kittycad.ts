import fetch from 'node-fetch';
import {
  UnitAngularVelocityConversion_type,
  Error_type,
  UnitAngularVelocityFormat_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Get_angular_velocity_unit_conversion_params {
  client?: Client;
  output_format: UnitAngularVelocityFormat_type;
  src_format: UnitAngularVelocityFormat_type;
  value: number;
}

type Get_angular_velocity_unit_conversion_return =
  | UnitAngularVelocityConversion_type
  | Error_type;

export default async function get_angular_velocity_unit_conversion({
  client,
  output_format,
  src_format,
  value,
}: Get_angular_velocity_unit_conversion_params): Promise<Get_angular_velocity_unit_conversion_return> {
  const url = `/unit/conversion/angular-velocity/${src_format}/${output_format}?value=${value}`;
  const fullUrl = 'https://api.kittycad.io' + url;
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
  const result =
    (await response.json()) as Get_angular_velocity_unit_conversion_return;
  return result;
}
