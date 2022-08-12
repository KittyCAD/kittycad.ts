import fetch from 'node-fetch';
import {
  UnitDataTransferRateConversion_type,
  Error_type,
  UnitDataTransferRateFormat_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Get_data_transfer_rate_unit_conversion_params {
  client?: Client;
  output_format: UnitDataTransferRateFormat_type;
  src_format: UnitDataTransferRateFormat_type;
  value: number;
}

type Get_data_transfer_rate_unit_conversion_return =
  | UnitDataTransferRateConversion_type
  | Error_type;

export default async function get_data_transfer_rate_unit_conversion({
  client,
  output_format,
  src_format,
  value,
}: Get_data_transfer_rate_unit_conversion_params): Promise<Get_data_transfer_rate_unit_conversion_return> {
  const url = `/unit/conversion/data-transfer-rate/${src_format}/${output_format}?value=${value}`;
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
    (await response.json()) as Get_data_transfer_rate_unit_conversion_return;
  return result;
}
