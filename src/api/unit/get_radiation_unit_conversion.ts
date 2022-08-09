import fetch from 'node-fetch';
import {
  UnitRadiationConversion_type,
  Error_type,
  UnitRadiationFormat_type,
} from '../../models.js';

interface Get_radiation_unit_conversion_params {
  output_format: UnitRadiationFormat_type;
  src_format: UnitRadiationFormat_type;
  value: number;
}

type Get_radiation_unit_conversion_return =
  | UnitRadiationConversion_type
  | Error_type;

export default async function get_radiation_unit_conversion({
  output_format,
  src_format,
  value,
}: Get_radiation_unit_conversion_params): Promise<Get_radiation_unit_conversion_return> {
  const url = `/unit/conversion/radiation/${src_format}/${output_format}?value=${value}`;
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
    (await response.json()) as Get_radiation_unit_conversion_return;
  return result;
}
