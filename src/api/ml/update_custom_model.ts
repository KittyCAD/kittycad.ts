import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { CustomModel, Uuid, UpdateCustomModel } from '../../models.js'

interface UpdateCustomModelInput {
  client?: Client
  id: Uuid
  body: UpdateCustomModel
}

type UpdateCustomModelReturn = CustomModel

/**
 * Update mutable metadata (name, system prompt) for a custom ML model owned by the caller's organization.
 *
 * Tags: ml
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The identifier. (path)
 * @property {UpdateCustomModel} body Request body payload
 * @returns {Promise<UpdateCustomModelReturn>} successful operation
 *
 * Possible return types: CustomModel
 */
export default async function update_custom_model({
  client,
  id,
  body,
}: UpdateCustomModelInput): Promise<UpdateCustomModelReturn> {
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
  headers['Content-Type'] = 'application/json'
  const fetchOptions: RequestInit = {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as UpdateCustomModelReturn
  return result
}
