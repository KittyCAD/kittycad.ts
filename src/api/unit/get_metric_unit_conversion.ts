import fetch from 'node-fetch';
import {
  UnitMetricConversion_type,
  Error_type,
  UnitMetricFormat_type,
} from '../../models.js';

interface Get_metric_unit_conversion_params {
  output_format: UnitMetricFormat_type;
  src_format: UnitMetricFormat_type;
  value: number;
}

type Get_metric_unit_conversion_return = UnitMetricConversion_type | Error_type;

export default async function get_metric_unit_conversion({
  output_format,
  src_format,
  value,
}: Get_metric_unit_conversion_params): Promise<Get_metric_unit_conversion_return> {
  const url = `/unit/conversion/metric/${src_format}/${output_format}?value=${value}`;
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
  const result = (await response.json()) as Get_metric_unit_conversion_return;
  return result;
}
