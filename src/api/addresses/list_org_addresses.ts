import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'
import { Pager, createPager } from '../../pagination.js'

import { AddressResponseResultsPage, AddressResponse } from '../../models.js'

interface ListOrgAddressesInput {
  client?: Client
  limit?: number
  page_token?: string
}

type ListOrgAddressesReturn = AddressResponseResultsPage

/**
 * List saved addresses belonging to your active organization.
 *
 * Current members can read delivery destinations; only admins see billing cards or manage the book. One-off and archived destinations are omitted.
 *
 * Tags: addresses
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {number} limit Maximum number of items returned by a single call (query)
 * @property {string} page_token Token returned by previous call to retrieve the subsequent page (query)
 * @returns {Promise<ListOrgAddressesReturn>} successful operation
 *
 * Possible return types: AddressResponseResultsPage
 */
export default async function list_org_addresses({
  client,
  limit,
  page_token,
}: ListOrgAddressesInput): Promise<ListOrgAddressesReturn> {
  const path = `/org/addresses`
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
  const result = (await response.json()) as ListOrgAddressesReturn
  return result
}

export function list_org_addresses_pager(
  params: ListOrgAddressesInput
): Pager<ListOrgAddressesInput, ListOrgAddressesReturn, AddressResponse> {
  return createPager<
    ListOrgAddressesInput,
    ListOrgAddressesReturn,
    AddressResponse
  >(list_org_addresses, params, 'page_token')
}
