import fetch from 'node-fetch';
import {
  UnitMassConversion_type,
  Error_type,
  UnitMassFormat_type,
} from '../../models.js';

interface Get_mass_unit_conversion_params {
  output_format: UnitMassFormat_type;
  src_format: UnitMassFormat_type;
  value: number;
}

type Get_mass_unit_conversion_return = UnitMassConversion_type | Error_type;

export default async function get_mass_unit_conversion({
  output_format,
  src_format,
  value,
}: Get_mass_unit_conversion_params): Promise<Get_mass_unit_conversion_return> {
  const url = `/unit/conversion/mass/${src_format}/${output_format}?value=${value}`;
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
  const result = (await response.json()) as Get_mass_unit_conversion_return;
  return result;
}
