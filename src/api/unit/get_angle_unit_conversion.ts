import fetch from 'node-fetch';
import {
  UnitAngleConversion_type,
  Error_type,
  UnitAngle_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Get_angle_unit_conversion_params {
  client?: Client;
  input_unit: UnitAngle_type;
  output_unit: UnitAngle_type;
  value: number;
}

type Get_angle_unit_conversion_return = UnitAngleConversion_type | Error_type;

export default async function get_angle_unit_conversion({
  client,
  input_unit,
  output_unit,
  value,
}: Get_angle_unit_conversion_params): Promise<Get_angle_unit_conversion_return> {
  const url = `/unit/conversion/angle/${input_unit}/${output_unit}?value=${value}`;
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
  const result = (await response.json()) as Get_angle_unit_conversion_return;
  return result;
}
