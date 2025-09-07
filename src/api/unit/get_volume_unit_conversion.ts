import { UnitVolumeConversion_type, UnitVolume_type } from '../../models.js';
import { Client } from '../../client.js';
import { throwIfNotOk } from '../../errors.js';

interface Get_volume_unit_conversion_params {
  client?: Client;
  input_unit: UnitVolume_type;
  output_unit: UnitVolume_type;
  value: number;
}

type Get_volume_unit_conversion_return = UnitVolumeConversion_type;

export default async function get_volume_unit_conversion({
  client,
  input_unit,
  output_unit,
  value,
}: Get_volume_unit_conversion_params): Promise<Get_volume_unit_conversion_return> {
  const url = `/unit/conversion/volume/${input_unit}/${output_unit}?value=${value}`;
  // Backwards compatible for the BASE_URL env variable
  // That used to exist in only this lib, ZOO_HOST exists in the all the other
  // sdks and the CLI.
  const urlBase =
    process?.env?.ZOO_HOST || process?.env?.BASE_URL || 'https://api.zoo.dev';
  const fullUrl = urlBase + url;
  // The other sdks use to use KITTYCAD_API_TOKEN, now they still do for
  // backwards compatibility, but the new standard is ZOO_API_TOKEN.
  // For some reason only this lib supported KITTYCAD_TOKEN, so we need to
  // check for that as well.
  const kittycadToken = client
    ? client.token || process.env.ZOO_API_TOKEN || ''
    : process.env.KITTYCAD_TOKEN ||
      process.env.KITTYCAD_API_TOKEN ||
      process.env.ZOO_API_TOKEN ||
      '';
  const headers = {
    Authorization: `Bearer ${kittycadToken}`,
    'Content-Type': 'text/plain',
  };
  const fetchOptions = {
    method: 'GET',
    headers,
  };
  const response = await fetch(fullUrl, fetchOptions);
  await throwIfNotOk(response);
  const result = (await response.json()) as Get_volume_unit_conversion_return;
  return result;
}
