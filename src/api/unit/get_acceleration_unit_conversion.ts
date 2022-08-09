import fetch from 'node-fetch';
import {
  UnitAccelerationConversion_type,
  Error_type,
  UnitAccelerationFormat_type,
} from '../../models.js';

interface Get_acceleration_unit_conversion_params {
  output_format: UnitAccelerationFormat_type;
  src_format: UnitAccelerationFormat_type;
  value: number;
}

type Get_acceleration_unit_conversion_return =
  | UnitAccelerationConversion_type
  | Error_type;

export default async function get_acceleration_unit_conversion({
  output_format,
  src_format,
  value,
}: Get_acceleration_unit_conversion_params): Promise<Get_acceleration_unit_conversion_return> {
  const url = `/unit/conversion/acceleration/${src_format}/${output_format}?value=${value}`;
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
  const result =
    (await response.json()) as Get_acceleration_unit_conversion_return;
  return result;
}
