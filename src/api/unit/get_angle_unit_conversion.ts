import { Client } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { UnitAngleConversion, UnitAngle } from '../../models.js'

interface GetAngleUnitConversionInput {
  client?: Client
  input_unit: UnitAngle
  output_unit: UnitAngle
  value: number
}

type GetAngleUnitConversionReturn = UnitAngleConversion

/**
 * Convert angle units.
 *
 * Convert an angle unit value to another angle unit value. This is a nice endpoint to use for helper functions.
 *
 * Tags: unit
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {UnitAngle} input_unit The source format of the unit. (path)
 * @property {UnitAngle} output_unit The output format of the unit. (path)
 * @property {number} value The initial value. (query)
 * @returns successful operation
 */
export default async function get_angle_unit_conversion({
  client,
  input_unit,
  output_unit,
  value,
}: GetAngleUnitConversionInput): Promise<GetAngleUnitConversionReturn> {
  const url = `/unit/conversion/angle/${input_unit}/${output_unit}?value=${value}`
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
  const result = (await response.json()) as GetAngleUnitConversionReturn
  return result
}
