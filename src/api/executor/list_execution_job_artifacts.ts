import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { ExecutionArtifactsResponse, Uuid, IdSortMode } from '../../models.js'

interface ListExecutionJobArtifactsInput {
  client?: Client
  id: Uuid
  limit?: number
  page_token?: string
  sort_by?: IdSortMode
}

type ListExecutionJobArtifactsReturn = ExecutionArtifactsResponse

/**
 * List verified durable outputs owned by the active user or organization.
 *
 * Tags: executor
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The identifier. (path)
 * @property {number} limit Maximum number of items returned by a single call (query)
 * @property {string} page_token Token returned by previous call to retrieve the subsequent page (query)
 * @property {IdSortMode} sort_by (query)
 * @returns {Promise<ListExecutionJobArtifactsReturn>} successful operation
 *
 * Possible return types: ExecutionArtifactsResponse
 */
export default async function list_execution_job_artifacts({
  client,
  id,
  limit,
  page_token,
  sort_by,
}: ListExecutionJobArtifactsInput): Promise<ListExecutionJobArtifactsReturn> {
  const path = `/execution/jobs/${id}/artifacts`
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
  const result = (await response.json()) as ListExecutionJobArtifactsReturn
  return result
}
