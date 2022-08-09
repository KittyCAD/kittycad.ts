import fetch from 'node-fetch';
import {
  UnitMagneticFluxConversion_type,
  Error_type,
  UnitMagneticFluxFormat_type,
} from '../../models.js';

interface Get_magnetic_flux_unit_conversion_params {
  output_format: UnitMagneticFluxFormat_type;
  src_format: UnitMagneticFluxFormat_type;
  value: number;
}

type Get_magnetic_flux_unit_conversion_return =
  | UnitMagneticFluxConversion_type
  | Error_type;

export default async function get_magnetic_flux_unit_conversion({
  output_format,
  src_format,
  value,
}: Get_magnetic_flux_unit_conversion_params): Promise<Get_magnetic_flux_unit_conversion_return> {
  const url = `/unit/conversion/magnetic-flux/${src_format}/${output_format}?value=${value}`;
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
    (await response.json()) as Get_magnetic_flux_unit_conversion_return;
  return result;
}
