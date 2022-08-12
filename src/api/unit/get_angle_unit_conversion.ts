import fetch from 'node-fetch';
import {
  UnitAngleConversion_type,
  Error_type,
  UnitAngleFormat_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Get_angle_unit_conversion_params {
  client?: Client;
  output_format: UnitAngleFormat_type;
  src_format: UnitAngleFormat_type;
  value: number;
}

type Get_angle_unit_conversion_return = UnitAngleConversion_type | Error_type;

export default async function get_angle_unit_conversion({
  client,
  output_format,
  src_format,
  value,
}: Get_angle_unit_conversion_params): Promise<Get_angle_unit_conversion_return> {
  const url = `/unit/conversion/angle/${src_format}/${output_format}?value=${value}`;
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
  const result = (await response.json()) as Get_angle_unit_conversion_return;
  return result;
}
