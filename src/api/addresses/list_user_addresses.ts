import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'
import { Pager, createPager } from '../../pagination.js'

import { AddressResponseResultsPage, AddressResponse } from '../../models.js'

interface ListUserAddressesInput {
  client?: Client
  limit?: number
  page_token?: string
}

type ListUserAddressesReturn = AddressResponseResultsPage

/**
 * List your saved addresses, including the current billing address.
 *
 * One-off and archived cards are omitted. Billing cards may contain incomplete historical details and use the payment endpoints for edits. Follow next_page with page_token to read the next page. Results are ordered by stable card ID.
 *
 * Tags: addresses
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {number} limit Maximum number of items returned by a single call (query)
 * @property {string} page_token Token returned by previous call to retrieve the subsequent page (query)
 * @returns {Promise<ListUserAddressesReturn>} successful operation
 *
 * Possible return types: AddressResponseResultsPage
 */
export default async function list_user_addresses({
  client,
  limit,
  page_token,
}: ListUserAddressesInput): Promise<ListUserAddressesReturn> {
  const path = `/user/addresses`
  const qs = buildQuery({ limit: limit, page_token: page_token })
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
  const result = (await response.json()) as ListUserAddressesReturn
  return result
}

export function list_user_addresses_pager(
  params: ListUserAddressesInput
): Pager<ListUserAddressesInput, ListUserAddressesReturn, AddressResponse> {
  return createPager<
    ListUserAddressesInput,
    ListUserAddressesReturn,
    AddressResponse
  >(list_user_addresses, params, 'page_token')
}
