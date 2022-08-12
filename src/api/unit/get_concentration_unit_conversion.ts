import fetch from 'node-fetch';
import {
  UnitConcentrationConversion_type,
  Error_type,
  UnitConcentrationFormat_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Get_concentration_unit_conversion_params {
  client?: Client;
  output_format: UnitConcentrationFormat_type;
  src_format: UnitConcentrationFormat_type;
  value: number;
}

type Get_concentration_unit_conversion_return =
  | UnitConcentrationConversion_type
  | Error_type;

export default async function get_concentration_unit_conversion({
  client,
  output_format,
  src_format,
  value,
}: Get_concentration_unit_conversion_params): Promise<Get_concentration_unit_conversion_return> {
  const url = `/unit/conversion/concentration/${src_format}/${output_format}?value=${value}`;
  const fullUrl = 'https://api.kittycad.io' + url;
  const kittycadToken = client
    ? client.token
    : process.env.KITTYCAD_TOKEN || '';
  const headers = {
    Authorization: `Bearer ${kittycadToken}`,
  };
  const fetchOptions = {
    method: 'POST',
    headers,
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result =
    (await response.json()) as Get_concentration_unit_conversion_return;
  return result;
}
