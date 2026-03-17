import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { CustomModel, Uuid } from '../../models.js'

interface GetCustomModelInput {
  client?: Client
  id: Uuid
}

type GetCustomModelReturn = CustomModel

/**
 * Retrieve the details of a single custom ML model so long as it belongs to the caller’s organization.
 *
 * Tags: ml
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The identifier. (path)
 * @returns {Promise<GetCustomModelReturn>} successful operation
 *
 * Possible return types: CustomModel
 */
export default async function get_custom_model({
  client,
  id,
}: GetCustomModelInput): Promise<GetCustomModelReturn> {
  const path = `/ml/custom/models/${id}`
  const qs = buildQuery({})
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
  const result = (await response.json()) as GetCustomModelReturn
  return result
}
