import fetch from 'node-fetch';
import {
  UnitRadiationConversion_type,
  Error_type,
  UnitRadiationFormat_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Get_radiation_unit_conversion_params {
  client?: Client;
  output_format: UnitRadiationFormat_type;
  src_format: UnitRadiationFormat_type;
  value: number;
}

type Get_radiation_unit_conversion_return =
  | UnitRadiationConversion_type
  | Error_type;

export default async function get_radiation_unit_conversion({
  client,
  output_format,
  src_format,
  value,
}: Get_radiation_unit_conversion_params): Promise<Get_radiation_unit_conversion_return> {
  const url = `/unit/conversion/radiation/${src_format}/${output_format}?value=${value}`;
  const urlBase = process?.env?.BASE_URL || 'https://api.kittycad.io';
  const fullUrl = urlBase + url;
  const kittycadToken = client
    ? client.token
    : process.env.KITTYCAD_TOKEN || '';
  const headers = {
    Authorization: `Bearer ${kittycadToken}`,
  };
  const fetchOptions = {
    method: 'GET',
    headers,
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result =
    (await response.json()) as Get_radiation_unit_conversion_return;
  return result;
}
