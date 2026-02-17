import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { OrgDataset, Uuid } from '../../models.js'

interface RescanOrgDatasetInput {
  client?: Client
  id: Uuid
  statuses?: string
}

type RescanOrgDatasetReturn = OrgDataset

/**
 * Request a rescan of a dataset that belongs to the caller's org.
 *
 * Tags: orgs
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The identifier. (path)
 * @property {string} statuses Optional comma-separated set of conversion statuses to retrigger.
 *
 * Example: `statuses=success,in_progress` If omitted, we retrigger all non-success conversions, but only retrigger `in_progress` conversions that have been running for more than 5 minutes. (query)
 * @returns {Promise<RescanOrgDatasetReturn>} successfully enqueued operation
 *
 * Possible return types: OrgDataset
 */
export default async function rescan_org_dataset({
  client,
  id,
  statuses,
}: RescanOrgDatasetInput): Promise<RescanOrgDatasetReturn> {
  const path = `/org/datasets/${id}/rescan`
  const qs = buildQuery({ statuses: statuses })
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
    method: 'POST',
    headers,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as RescanOrgDatasetReturn
  return result
}
