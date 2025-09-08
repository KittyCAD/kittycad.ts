import { Client } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { UnitVolumeConversion, UnitVolume } from '../../models.js'

interface GetVolumeUnitConversionInput {
  client?: Client
  input_unit: UnitVolume
  output_unit: UnitVolume
  value: number
}

type GetVolumeUnitConversionReturn = UnitVolumeConversion

/**
 * Convert volume units.
 *
 * Convert a volume unit value to another volume unit value. This is a nice endpoint to use for helper functions.
 *
 * Tags: unit
 *
 * @param client Optional client with auth token.
 * @param input_unit The source format of the unit. (path)
 * @param output_unit The output format of the unit. (path)
 * @param value The initial value. (query)
 * @returns successful operation
 */
export default async function get_volume_unit_conversion({
  client,
  input_unit,
  output_unit,
  value,
}: GetVolumeUnitConversionInput): Promise<GetVolumeUnitConversionReturn> {
  const url = `/unit/conversion/volume/${input_unit}/${output_unit}?value=${value}`
  // Backwards compatible for the BASE_URL env variable
  // That used to exist in only this lib, ZOO_HOST exists in the all the other
  // sdks and the CLI.
  const urlBase =
    process?.env?.ZOO_HOST || process?.env?.BASE_URL || 'https://api.zoo.dev'
  const fullUrl = urlBase + url
  // The other sdks use to use KITTYCAD_API_TOKEN, now they still do for
  // backwards compatibility, but the new standard is ZOO_API_TOKEN.
  // For some reason only this lib supported KITTYCAD_TOKEN, so we need to
  // check for that as well.
  const kittycadToken = client
    ? client.token || process.env.ZOO_API_TOKEN || ''
    : process.env.KITTYCAD_TOKEN ||
      process.env.KITTYCAD_API_TOKEN ||
      process.env.ZOO_API_TOKEN ||
      ''
  const headers: Record<string, string> = {}
  if (kittycadToken) headers.Authorization = `Bearer ${kittycadToken}`
  const fetchOptions: RequestInit = {
    method: 'GET',
    headers,
  }
  const response = await fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as GetVolumeUnitConversionReturn
  return result
}
