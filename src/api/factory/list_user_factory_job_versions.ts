import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'
import { Pager, createPager } from '../../pagination.js'

import {
  FactoryCustomerJobVersionResultsPage,
  Uuid,
  CreatedAtSortMode,
  FactoryCustomerJobVersion,
} from '../../models.js'

interface ListUserFactoryJobVersionsInput {
  client?: Client
  job_id: Uuid
  limit?: number
  page_token?: string
  sort_by?: CreatedAtSortMode
}

type ListUserFactoryJobVersionsReturn = FactoryCustomerJobVersionResultsPage

/**
 * List a personal Factory job's submitted revision history, newest first by default.
 *
 * Tags: factory
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} job_id The requested job's identifier. (path)
 * @property {number} limit Maximum number of items returned by a single call (query)
 * @property {string} page_token Token returned by previous call to retrieve the subsequent page (query)
 * @property {CreatedAtSortMode} sort_by (query)
 * @returns {Promise<ListUserFactoryJobVersionsReturn>} successful operation
 *
 * Possible return types: FactoryCustomerJobVersionResultsPage
 */
export default async function list_user_factory_job_versions({
  client,
  job_id,
  limit,
  page_token,
  sort_by,
}: ListUserFactoryJobVersionsInput): Promise<ListUserFactoryJobVersionsReturn> {
  const path = `/user/factory/jobs/${job_id}/versions`
  const qs = buildQuery({
    limit: limit,
    page_token: page_token,
    sort_by: sort_by,
  })
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
  const result = (await response.json()) as ListUserFactoryJobVersionsReturn
  return result
}

export function list_user_factory_job_versions_pager(
  params: ListUserFactoryJobVersionsInput
): Pager<
  ListUserFactoryJobVersionsInput,
  ListUserFactoryJobVersionsReturn,
  FactoryCustomerJobVersion
> {
  return createPager<
    ListUserFactoryJobVersionsInput,
    ListUserFactoryJobVersionsReturn,
    FactoryCustomerJobVersion
  >(list_user_factory_job_versions, params, 'page_token')
}
