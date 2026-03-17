import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { OrgDatasetConversionStatsResponse, Uuid } from '../../models.js'

interface GetOrgDatasetConversionStatsInput {
  client?: Client
  id: Uuid
}

type GetOrgDatasetConversionStatsReturn = OrgDatasetConversionStatsResponse

/**
 * Return aggregate conversion stats for a dataset owned by the caller's org.
 *
 * Tags: orgs
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The identifier. (path)
 * @returns {Promise<GetOrgDatasetConversionStatsReturn>} successful operation
 *
 * Possible return types: OrgDatasetConversionStatsResponse
 */
export default async function get_org_dataset_conversion_stats({
  client,
  id,
}: GetOrgDatasetConversionStatsInput): Promise<GetOrgDatasetConversionStatsReturn> {
  const path = `/org/datasets/${id}/stats`
  const qs = buildQuery({})
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
  const result = (await response.json()) as GetOrgDatasetConversionStatsReturn
  return result
}
