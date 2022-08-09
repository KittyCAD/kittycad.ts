import fetch from 'node-fetch';
import {
  UnitDensityConversion_type,
  Error_type,
  UnitDensityFormat_type,
} from '../../models.js';

interface Get_density_unit_conversion_params {
  output_format: UnitDensityFormat_type;
  src_format: UnitDensityFormat_type;
  value: number;
}

type Get_density_unit_conversion_return =
  | UnitDensityConversion_type
  | Error_type;

export default async function get_density_unit_conversion({
  output_format,
  src_format,
  value,
}: Get_density_unit_conversion_params): Promise<Get_density_unit_conversion_return> {
  const url = `/unit/conversion/density/${src_format}/${output_format}?value=${value}`;
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
  const result = (await response.json()) as Get_density_unit_conversion_return;
  return result;
}
