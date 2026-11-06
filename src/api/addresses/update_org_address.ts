import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { AddressResponse, Uuid, UpdateAddressRequest } from '../../models.js'

interface UpdateOrgAddressInput {
  client?: Client
  id: Uuid
  body: UpdateAddressRequest
}

type UpdateOrgAddressReturn = AddressResponse

/**
 * Replace an organization delivery address and its shipping-default selection.
 *
 * Requires organization-admin access and the current revision_id as expected_revision. Previously pinned order contents remain unchanged.
 *
 * Tags: addresses
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The identifier. (path)
 * @property {UpdateAddressRequest} body Request body payload
 * @returns {Promise<UpdateOrgAddressReturn>} successful operation
 *
 * Possible return types: AddressResponse
 */
export default async function update_org_address({
  client,
  id,
  body,
}: UpdateOrgAddressInput): Promise<UpdateOrgAddressReturn> {
  const path = `/org/addresses/${id}`
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
  const result = (await response.json()) as UpdateOrgAddressReturn
  return result
}
