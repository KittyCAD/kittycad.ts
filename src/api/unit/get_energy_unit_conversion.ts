import {
  UnitEnergyConversion_type,
  Error_type,
  UnitEnergy_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Get_energy_unit_conversion_params {
  client?: Client;
  input_unit: UnitEnergy_type;
  output_unit: UnitEnergy_type;
  value: number;
}

type Get_energy_unit_conversion_return = UnitEnergyConversion_type | Error_type;

export default async function get_energy_unit_conversion({
  client,
  input_unit,
  output_unit,
  value,
}: Get_energy_unit_conversion_params): Promise<Get_energy_unit_conversion_return> {
  const url = `/unit/conversion/energy/${input_unit}/${output_unit}?value=${value}`;
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
