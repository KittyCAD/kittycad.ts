import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { UnitForceConversion, UnitForce } from '../../models.js'

interface GetForceUnitConversionInput {
  client?: Client
  input_unit: UnitForce
  output_unit: UnitForce
  value: number
}

type GetForceUnitConversionReturn = UnitForceConversion

/**
 * Convert force units.
 *
 * Convert a force unit value to another force unit value. This is a nice endpoint to use for helper functions.
 *
 * Tags: unit
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {UnitForce} input_unit The source format of the unit. (path)
 * @property {UnitForce} output_unit The output format of the unit. (path)
 * @property {number} value The initial value. (query)
 * @returns {Promise<GetForceUnitConversionReturn>} successful operation
 *
 * Possible return types: UnitForceConversion
 */
export default async function get_force_unit_conversion({
  client,
  input_unit,
  output_unit,
  value,
}: GetForceUnitConversionInput): Promise<GetForceUnitConversionReturn> {
  const path = `/unit/conversion/force/${input_unit}/${output_unit}`
  const qs = buildQuery({ value: value })
  const url = path + qs
  // Backwards compatible for the BASE_URL env variable
  // That used to exist in only this lib, ZOO_HOST exists in the all the other
  // sdks and the CLI.
  const urlBase = client?.baseUrl || 'https://api.zoo.dev'
  const fullUrl = urlBase + url
  const kittycadToken = client ? client.token || '' : ''
  const headers: Record<string, string> = {}
  if (kittycadToken) headers.Authorization = `Bearer ${kittycadToken}`
  const fetchOptions: RequestInit = {
    method: 'GET',
    headers,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as GetForceUnitConversionReturn
  return result
}
