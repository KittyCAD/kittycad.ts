import fetch from 'node-fetch';
import {
  UnitMagneticFieldStrengthConversion_type,
  Error_type,
  UnitMagneticFieldStrengthFormat_type,
} from '../../models.js';

interface Get_magnetic_field_strength_unit_conversion_params {
  output_format: UnitMagneticFieldStrengthFormat_type;
  src_format: UnitMagneticFieldStrengthFormat_type;
  value: number;
}

type Get_magnetic_field_strength_unit_conversion_return =
  | UnitMagneticFieldStrengthConversion_type
  | Error_type;

export default async function get_magnetic_field_strength_unit_conversion({
  output_format,
  src_format,
  value,
}: Get_magnetic_field_strength_unit_conversion_params): Promise<Get_magnetic_field_strength_unit_conversion_return> {
  const url = `/unit/conversion/magnetic-field-strength/${src_format}/${output_format}?value=${value}`;
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
    (await response.json()) as Get_magnetic_field_strength_unit_conversion_return;
  return result;
}
