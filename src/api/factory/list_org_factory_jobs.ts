import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'
import { Pager, createPager } from '../../pagination.js'

import {
  FactoryCustomerJobSummaryResultsPage,
  CreatedAtSortMode,
  FactoryCustomerJobSummary,
} from '../../models.js'

interface ListOrgFactoryJobsInput {
  client?: Client
  limit?: number
  page_token?: string
  sort_by?: CreatedAtSortMode
}

type ListOrgFactoryJobsReturn = FactoryCustomerJobSummaryResultsPage

/**
 * List Factory jobs owned by your organization.
 *
 * Any current organization member can list its jobs, including archived jobs. Ownership uses the job's stored organization, so a submitter leaving or deleting their account does not move the job. Former members lose access. Results are paginated, newest first by default, with the job id breaking ties. Internal communication, financial details, and file storage locations are omitted.
 *
 * Tags: factory
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {number} limit Maximum number of items returned by a single call (query)
 * @property {string} page_token Token returned by previous call to retrieve the subsequent page (query)
 * @property {CreatedAtSortMode} sort_by (query)
 * @returns {Promise<ListOrgFactoryJobsReturn>} successful operation
 *
 * Possible return types: FactoryCustomerJobSummaryResultsPage
 */
export default async function list_org_factory_jobs({
  client,
  limit,
  page_token,
  sort_by,
}: ListOrgFactoryJobsInput): Promise<ListOrgFactoryJobsReturn> {
  const path = `/org/factory/jobs`
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
  const result = (await response.json()) as ListOrgFactoryJobsReturn
  return result
}

export function list_org_factory_jobs_pager(
  params: ListOrgFactoryJobsInput
): Pager<
  ListOrgFactoryJobsInput,
  ListOrgFactoryJobsReturn,
  FactoryCustomerJobSummary
> {
  return createPager<
    ListOrgFactoryJobsInput,
    ListOrgFactoryJobsReturn,
    FactoryCustomerJobSummary
  >(list_org_factory_jobs, params, 'page_token')
}
