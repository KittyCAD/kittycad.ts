import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { AddressResponse, CreateAddressRequest } from '../../models.js'

interface CreateOrgAddressInput {
  client?: Client
  body: CreateAddressRequest
}

type CreateOrgAddressReturn = AddressResponse

/**
 * Create a saved or one-off destination belonging to your organization.
 *
 * Admins can save cards or select shipping defaults. Other current members can create one-off destinations with is_saved=false without modifying the book.
 *
 * Tags: addresses
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {CreateAddressRequest} body Request body payload
 * @returns {Promise<CreateOrgAddressReturn>} successful creation
 *
 * Possible return types: AddressResponse
 */
export default async function create_org_address({
  client,
  body,
}: CreateOrgAddressInput): Promise<CreateOrgAddressReturn> {
  const path = `/org/addresses`
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
  const result = (await response.json()) as CreateOrgAddressReturn
  return result
}
