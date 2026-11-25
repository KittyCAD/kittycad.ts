import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'
import { Pager, createPager } from '../../pagination.js'

import {
  ExecutionJobResponseResultsPage,
  ExecutionJobStatus,
  CreatedAtSortMode,
  ExecutionJobResponse,
} from '../../models.js'

interface ListExecutionJobsInput {
  client?: Client
  limit?: number
  page_token?: string
  status?: ExecutionJobStatus
  runtime_id?: string
  created_after?: string
  sort_by?: CreatedAtSortMode
}

type ListExecutionJobsReturn = ExecutionJobResponseResultsPage

/**
 * List execution jobs owned by the active user or organization.
 *
 * Tags: executor
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {number} limit Maximum number of items returned by a single call (query)
 * @property {string} page_token Token returned by previous call to retrieve the subsequent page (query)
 * @property {ExecutionJobStatus} status Return only jobs in this lifecycle state. (query)
 * @property {string} runtime_id Return only jobs using this runtime. (query)
 * @property {string} created_after Return only jobs created after this timestamp. (query)
 * @property {CreatedAtSortMode} sort_by (query)
 * @returns {Promise<ListExecutionJobsReturn>} successful operation
 *
 * Possible return types: ExecutionJobResponseResultsPage
 */
export default async function list_execution_jobs({
  client,
  limit,
  page_token,
  status,
  runtime_id,
  created_after,
  sort_by,
}: ListExecutionJobsInput): Promise<ListExecutionJobsReturn> {
  const path = `/execution/jobs`
  const qs = buildQuery({
    limit: limit,
    page_token: page_token,
    status: status,
    runtime_id: runtime_id,
    created_after: created_after,
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
  const result = (await response.json()) as ListExecutionJobsReturn
  return result
}

export function list_execution_jobs_pager(
  params: ListExecutionJobsInput
): Pager<
  ListExecutionJobsInput,
  ListExecutionJobsReturn,
  ExecutionJobResponse
> {
  return createPager<
    ListExecutionJobsInput,
    ListExecutionJobsReturn,
    ExecutionJobResponse
  >(list_execution_jobs, params, 'page_token')
}
