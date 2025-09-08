import { Client } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { UnitPowerConversion, UnitPower } from '../../models.js'

interface GetPowerUnitConversionInput {
  client?: Client
  input_unit: UnitPower
  output_unit: UnitPower
  value: number
}

type GetPowerUnitConversionReturn = UnitPowerConversion

/**
 * Convert power units.
 *
 * Convert a power unit value to another power unit value. This is a nice endpoint to use for helper functions.
 *
 * Tags: unit
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {UnitPower} input_unit The source format of the unit. (path)
 * @property {UnitPower} output_unit The output format of the unit. (path)
 * @property {number} value The initial value. (query)
 * @returns {Promise<GetPowerUnitConversionReturn>} successful operation
 *
 * Possible return types: UnitPowerConversion
 */
export default async function get_power_unit_conversion({
  client,
  input_unit,
  output_unit,
  value,
}: GetPowerUnitConversionInput): Promise<GetPowerUnitConversionReturn> {
  const url = `/unit/conversion/power/${input_unit}/${output_unit}?value=${value}`
  // Backwards compatible for the BASE_URL env variable
  // That used to exist in only this lib, ZOO_HOST exists in the all the other
  // sdks and the CLI.
  const urlBase =
    client?.baseUrl ||
    process?.env?.ZOO_HOST ||
    process?.env?.BASE_URL ||
    'https://api.zoo.dev'
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
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as GetPowerUnitConversionReturn
  return result
}
