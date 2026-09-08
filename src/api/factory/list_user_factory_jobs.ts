import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'
import { Pager, createPager } from '../../pagination.js'

import {
  FactoryCustomerJobSummaryResultsPage,
  CreatedAtSortMode,
  FactoryCustomerJobSummary,
} from '../../models.js'

interface ListUserFactoryJobsInput {
  client?: Client
  limit?: number
  page_token?: string
  sort_by?: CreatedAtSortMode
}

type ListUserFactoryJobsReturn = FactoryCustomerJobSummaryResultsPage

/**
 * List your personal Factory jobs.
 *
 * Returns jobs owned by your account, including archived jobs. Jobs with an organization owner belong to that organization, even when your account is also associated with them; use `GET /org/factory/jobs` to list those jobs. Results are paginated, newest first by default, with the job id breaking ties. Internal communication, financial details, and file storage locations are omitted.
 *
 * Tags: factory
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {number} limit Maximum number of items returned by a single call (query)
 * @property {string} page_token Token returned by previous call to retrieve the subsequent page (query)
 * @property {CreatedAtSortMode} sort_by (query)
 * @returns {Promise<ListUserFactoryJobsReturn>} successful operation
 *
 * Possible return types: FactoryCustomerJobSummaryResultsPage
 */
export default async function list_user_factory_jobs({
  client,
  limit,
  page_token,
  sort_by,
}: ListUserFactoryJobsInput): Promise<ListUserFactoryJobsReturn> {
  const path = `/user/factory/jobs`
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
  const result = (await response.json()) as ListUserFactoryJobsReturn
  return result
}

export function list_user_factory_jobs_pager(
  params: ListUserFactoryJobsInput
): Pager<
  ListUserFactoryJobsInput,
  ListUserFactoryJobsReturn,
  FactoryCustomerJobSummary
> {
  return createPager<
    ListUserFactoryJobsInput,
    ListUserFactoryJobsReturn,
    FactoryCustomerJobSummary
  >(list_user_factory_jobs, params, 'page_token')
}
