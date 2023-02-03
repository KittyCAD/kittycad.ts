import fetch from 'node-fetch';
import {
  UnitChargeConversion_type,
  Error_type,
  UnitChargeFormat_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Get_charge_unit_conversion_params {
  client?: Client;
  output_format: UnitChargeFormat_type;
  src_format: UnitChargeFormat_type;
  value: number;
}

type Get_charge_unit_conversion_return = UnitChargeConversion_type | Error_type;

export default async function get_charge_unit_conversion({
  client,
  output_format,
  src_format,
  value,
}: Get_charge_unit_conversion_params): Promise<Get_charge_unit_conversion_return> {
  const url = `/unit/conversion/charge/${src_format}/${output_format}?value=${value}`;
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
  const result = (await response.json()) as Get_charge_unit_conversion_return;
  return result;
}
