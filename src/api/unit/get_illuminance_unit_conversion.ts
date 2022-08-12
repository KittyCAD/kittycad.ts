import fetch from 'node-fetch';
import {
  UnitIlluminanceConversion_type,
  Error_type,
  UnitIlluminanceFormat_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Get_illuminance_unit_conversion_params {
  client?: Client;
  output_format: UnitIlluminanceFormat_type;
  src_format: UnitIlluminanceFormat_type;
  value: number;
}

type Get_illuminance_unit_conversion_return =
  | UnitIlluminanceConversion_type
  | Error_type;

export default async function get_illuminance_unit_conversion({
  client,
  output_format,
  src_format,
  value,
}: Get_illuminance_unit_conversion_params): Promise<Get_illuminance_unit_conversion_return> {
  const url = `/unit/conversion/illuminance/${src_format}/${output_format}?value=${value}`;
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
    (await response.json()) as Get_illuminance_unit_conversion_return;
  return result;
}
