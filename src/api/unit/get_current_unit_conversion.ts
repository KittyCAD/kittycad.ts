import { Client } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { UnitCurrentConversion, UnitCurrent } from '../../models.js'

interface GetCurrentUnitConversionInput {
  client?: Client
  input_unit: UnitCurrent
  output_unit: UnitCurrent
  value: number
}

type GetCurrentUnitConversionReturn = UnitCurrentConversion

/**
 * Convert current units.
 *
 * Convert a current unit value to another current unit value. This is a nice endpoint to use for helper functions.
 *
 * Tags: unit
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {UnitCurrent} input_unit The source format of the unit. (path)
 * @property {UnitCurrent} output_unit The output format of the unit. (path)
 * @property {number} value The initial value. (query)
 * @returns successful operation
 */
export default async function get_current_unit_conversion({
  client,
  input_unit,
  output_unit,
  value,
}: GetCurrentUnitConversionInput): Promise<GetCurrentUnitConversionReturn> {
  const url = `/unit/conversion/current/${input_unit}/${output_unit}?value=${value}`
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
  const result = (await response.json()) as GetCurrentUnitConversionReturn
  return result
}
