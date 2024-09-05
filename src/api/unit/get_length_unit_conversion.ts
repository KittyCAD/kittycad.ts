import {
  UnitLengthConversion_type,
  Error_type,
  UnitLength_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Get_length_unit_conversion_params {
  client?: Client;
  input_unit: UnitLength_type;
  output_unit: UnitLength_type;
  value: number;
}

type Get_length_unit_conversion_return = UnitLengthConversion_type | Error_type;

export default async function get_length_unit_conversion({
  client,
  input_unit,
  output_unit,
  value,
}: Get_length_unit_conversion_params): Promise<Get_length_unit_conversion_return> {
  const url = `/unit/conversion/length/${input_unit}/${output_unit}?value=${value}`;
  const urlBase = process?.env?.BASE_URL || 'https://api.zoo.dev';
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
  const result = (await response.json()) as Get_length_unit_conversion_return;
  return result;
}
