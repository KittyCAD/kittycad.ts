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
}

type ListOrgDatasetConversionsReturn =
  OrgDatasetFileConversionSummaryResultsPage

/**
 * List the file conversions that have been processed for a given dataset owned by the caller's org.
 *
 * Tags: orgs
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The identifier. (path)
 * @property {number} limit Maximum number of items returned by a single call (query)
 * @property {string} page_token Token returned by previous call to retrieve the subsequent page (query)
 * @property {ConversionSortMode} sort_by (query)
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
}: ListOrgDatasetConversionsInput): Promise<ListOrgDatasetConversionsReturn> {
  const path = `/org/datasets/${id}/conversions`
  const qs = buildQuery({
    limit: limit,
    page_token: page_token,
    sort_by: sort_by,
  })
  const url = path + qs
  // Backwards compatible for the BASE_URL env variable
  // That used to exist in only this lib, ZOO_HOST exists in the all the other
  // sdks and the CLI.
  const urlBase =
    client?.baseUrl ||
    process?.env?.ZOO_HOST ||
    process?.env?.BASE_URL ||
    'https://api.zoo.dev'
  const fullUrl = urlBase + url
  // The other sdks use to use KITTYCAD_API_TOKEN, now they still do for
  // backwards compatibility, but the new standard is ZOO_API_TOKEN.
  // For some reason only this lib supported KITTYCAD_TOKEN, so we need to
  // check for that as well.
  const kittycadToken = client
    ? client.token || process.env.ZOO_API_TOKEN || ''
    : process.env.KITTYCAD_TOKEN ||
      process.env.KITTYCAD_API_TOKEN ||
      process.env.ZOO_API_TOKEN ||
      ''
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
