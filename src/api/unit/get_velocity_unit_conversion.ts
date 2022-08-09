import fetch from 'node-fetch';
import {
  UnitVelocityConversion_type,
  Error_type,
  UnitVelocityFormat_type,
} from '../../models.js';

interface Get_velocity_unit_conversion_params {
  output_format: UnitVelocityFormat_type;
  src_format: UnitVelocityFormat_type;
  value: number;
}

type Get_velocity_unit_conversion_return =
  | UnitVelocityConversion_type
  | Error_type;

export default async function get_velocity_unit_conversion({
  output_format,
  src_format,
  value,
}: Get_velocity_unit_conversion_params): Promise<Get_velocity_unit_conversion_return> {
  const url = `/unit/conversion/velocity/${src_format}/${output_format}?value=${value}`;
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
  const result = (await response.json()) as Get_velocity_unit_conversion_return;
  return result;
}
