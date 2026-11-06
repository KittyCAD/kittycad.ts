import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { AddressResponse, CreateAddressRequest } from '../../models.js'

interface CreateUserAddressInput {
  client?: Client
  body: CreateAddressRequest
}

type CreateUserAddressReturn = AddressResponse

/**
 * Create a personal delivery address.
 *
 * Set is_saved=false for a one-off destination. It remains owned and erasable while staying out of the picker. Creating a delivery address never changes billing.
 *
 * Tags: addresses
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {CreateAddressRequest} body Request body payload
 * @returns {Promise<CreateUserAddressReturn>} successful creation
 *
 * Possible return types: AddressResponse
 */
export default async function create_user_address({
  client,
  body,
}: CreateUserAddressInput): Promise<CreateUserAddressReturn> {
  const path = `/user/addresses`
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
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as CreateUserAddressReturn
  return result
}
