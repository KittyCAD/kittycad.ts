import fetch from 'node-fetch';
import {
  UnitRadioactivityConversion_type,
  Error_type,
  UnitRadioactivityFormat_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Get_radioactivity_unit_conversion_params {
  client?: Client;
  output_format: UnitRadioactivityFormat_type;
  src_format: UnitRadioactivityFormat_type;
  value: number;
}

type Get_radioactivity_unit_conversion_return =
  | UnitRadioactivityConversion_type
  | Error_type;

export default async function get_radioactivity_unit_conversion({
  client,
  output_format,
  src_format,
  value,
}: Get_radioactivity_unit_conversion_params): Promise<Get_radioactivity_unit_conversion_return> {
  const url = `/unit/conversion/radioactivity/${src_format}/${output_format}?value=${value}`;
  const fullUrl = 'https://api.kittycad.io' + url;
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
    (await response.json()) as Get_radioactivity_unit_conversion_return;
  return result;
}
