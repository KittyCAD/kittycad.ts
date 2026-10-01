import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'
import { Pager, createPager } from '../../pagination.js'

import {
  FactoryCustomerCatalogOptionResultsPage,
  FactoryCustomerCatalogOption,
} from '../../models.js'

interface GetUserFactoryFinishesInput {
  client?: Client
  limit?: number
  page_token?: string
}

type GetUserFactoryFinishesReturn = FactoryCustomerCatalogOptionResultsPage

/**
 * List finishes currently available for customer Factory submissions.
 *
 * Internal-only entries are omitted. Results are ordered alphabetically, ignoring case, with "Other" last. Clients should refetch this endpoint after a catalog validation error before asking the customer to choose again.
 *
 * Tags: factory
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {number} limit Maximum number of items returned by a single call (query)
 * @property {string} page_token Token returned by previous call to retrieve the subsequent page (query)
 * @returns {Promise<GetUserFactoryFinishesReturn>} successful operation
 *
 * Possible return types: FactoryCustomerCatalogOptionResultsPage
 */
export default async function get_user_factory_finishes({
  client,
  limit,
  page_token,
}: GetUserFactoryFinishesInput): Promise<GetUserFactoryFinishesReturn> {
  const path = `/user/factory/finishes`
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
  const result = (await response.json()) as GetUserFactoryFinishesReturn
  return result
}

export function get_user_factory_finishes_pager(
  params: GetUserFactoryFinishesInput
): Pager<
  GetUserFactoryFinishesInput,
  GetUserFactoryFinishesReturn,
  FactoryCustomerCatalogOption
> {
  return createPager<
    GetUserFactoryFinishesInput,
    GetUserFactoryFinishesReturn,
    FactoryCustomerCatalogOption
  >(get_user_factory_finishes, params, 'page_token')
}
