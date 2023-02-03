import fetch from 'node-fetch';
import {
  UnitMetricPowerCubedConversion_type,
  Error_type,
  UnitMetricPower_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Get_metric_power_cubed_unit_conversion_params {
  client?: Client;
  output_format: UnitMetricPower_type;
  src_format: UnitMetricPower_type;
  value: number;
}

type Get_metric_power_cubed_unit_conversion_return =
  | UnitMetricPowerCubedConversion_type
  | Error_type;

export default async function get_metric_power_cubed_unit_conversion({
  client,
  output_format,
  src_format,
  value,
}: Get_metric_power_cubed_unit_conversion_params): Promise<Get_metric_power_cubed_unit_conversion_return> {
  const url = `/unit/conversion/metric/cubed/${src_format}/${output_format}?value=${value}`;
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
    (await response.json()) as Get_metric_power_cubed_unit_conversion_return;
  return result;
}
