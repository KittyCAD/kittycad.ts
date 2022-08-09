import fetch from 'node-fetch';
import {
  UnitVolumeConversion_type,
  Error_type,
  UnitVolumeFormat_type,
} from '../../models.js';

interface Get_volume_unit_conversion_params {
  output_format: UnitVolumeFormat_type;
  src_format: UnitVolumeFormat_type;
  value: number;
}

type Get_volume_unit_conversion_return = UnitVolumeConversion_type | Error_type;

export default async function get_volume_unit_conversion({
  output_format,
  src_format,
  value,
}: Get_volume_unit_conversion_params): Promise<Get_volume_unit_conversion_return> {
  const url = `/unit/conversion/volume/${src_format}/${output_format}?value=${value}`;
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
  const result = (await response.json()) as Get_volume_unit_conversion_return;
  return result;
}
