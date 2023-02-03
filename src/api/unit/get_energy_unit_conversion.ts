import fetch from 'node-fetch';
import {
  UnitEnergyConversion_type,
  Error_type,
  UnitEnergyFormat_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Get_energy_unit_conversion_params {
  client?: Client;
  output_format: UnitEnergyFormat_type;
  src_format: UnitEnergyFormat_type;
  value: number;
}

type Get_energy_unit_conversion_return = UnitEnergyConversion_type | Error_type;

export default async function get_energy_unit_conversion({
  client,
  output_format,
  src_format,
  value,
}: Get_energy_unit_conversion_params): Promise<Get_energy_unit_conversion_return> {
  const url = `/unit/conversion/energy/${src_format}/${output_format}?value=${value}`;
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
  const result = (await response.json()) as Get_energy_unit_conversion_return;
  return result;
}
