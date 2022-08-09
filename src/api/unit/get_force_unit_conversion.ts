import fetch from 'node-fetch';
import {
  UnitForceConversion_type,
  Error_type,
  UnitForceFormat_type,
} from '../../models.js';

interface Get_force_unit_conversion_params {
  output_format: UnitForceFormat_type;
  src_format: UnitForceFormat_type;
  value: number;
}

type Get_force_unit_conversion_return = UnitForceConversion_type | Error_type;

export default async function get_force_unit_conversion({
  output_format,
  src_format,
  value,
}: Get_force_unit_conversion_params): Promise<Get_force_unit_conversion_return> {
  const url = `/unit/conversion/force/${src_format}/${output_format}?value=${value}`;
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
  const result = (await response.json()) as Get_force_unit_conversion_return;
  return result;
}
