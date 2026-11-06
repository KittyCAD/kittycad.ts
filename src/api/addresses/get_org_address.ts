import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { AddressResponse, Uuid } from '../../models.js'

interface GetOrgAddressInput {
  client?: Client
  id: Uuid
}

type GetOrgAddressReturn = AddressResponse

/**
 * Get an address from your active organization's address book.
 *
 * Requires current membership. Billing cards require organization-admin access.
 *
 * Tags: addresses
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The identifier. (path)
 * @returns {Promise<GetOrgAddressReturn>} successful operation
 *
 * Possible return types: AddressResponse
 */
export default async function get_org_address({
  client,
  id,
}: GetOrgAddressInput): Promise<GetOrgAddressReturn> {
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
  const fetchOptions: RequestInit = {
    method: 'GET',
    headers,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as GetOrgAddressReturn
  return result
}
