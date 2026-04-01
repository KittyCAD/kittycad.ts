import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'
import { Pager, createPager } from '../../pagination.js'

import {
  OrgDatasetFileConversionSummaryResultsPage,
  Uuid,
  ConversionSortMode,
  OrgDatasetFileConversionSummary,
} from '../../models.js'

interface ListOrgDatasetConversionsInput {
  client?: Client
  id: Uuid
  limit?: number
  page_token?: string
  sort_by?: ConversionSortMode
  filter?: string
}

type ListOrgDatasetConversionsReturn =
  OrgDatasetFileConversionSummaryResultsPage

/**
 * List the file conversions that have been processed for a given dataset owned by the caller's org.
 *
 * This endpoint returns lightweight conversion summaries only (including `phase`), and intentionally omits converted KCL output and snapshot image payloads for speed. Use the optional `filter` query parameter to filter results (example: `?filter=status:success`).
 *
 * Tags: orgs
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The identifier. (path)
 * @property {number} limit Maximum number of items returned by a single call (query)
 * @property {string} page_token Token returned by previous call to retrieve the subsequent page (query)
 * @property {ConversionSortMode} sort_by (query)
 * @property {string} filter Optional filter string for conversions (example: `status:success`). (query)
 * @returns {Promise<ListOrgDatasetConversionsReturn>} successful operation
 *
 * Possible return types: OrgDatasetFileConversionSummaryResultsPage
 */
export default async function list_org_dataset_conversions({
  client,
  id,
  limit,
  page_token,
  sort_by,
  filter,
}: ListOrgDatasetConversionsInput): Promise<ListOrgDatasetConversionsReturn> {
  const path = `/org/datasets/${id}/conversions`
  const qs = buildQuery({
    limit: limit,
    page_token: page_token,
    sort_by: sort_by,
    filter: filter,
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
  const result = (await response.json()) as ListOrgDatasetConversionsReturn
  return result
}

export function list_org_dataset_conversions_pager(
  params: ListOrgDatasetConversionsInput
): Pager<
  ListOrgDatasetConversionsInput,
  ListOrgDatasetConversionsReturn,
  OrgDatasetFileConversionSummary
> {
  return createPager<
    ListOrgDatasetConversionsInput,
    ListOrgDatasetConversionsReturn,
    OrgDatasetFileConversionSummary
  >(list_org_dataset_conversions, params, 'page_token')
}
