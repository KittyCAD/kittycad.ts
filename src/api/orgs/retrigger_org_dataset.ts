import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { Uuid } from '../../models.js'

interface RetriggerOrgDatasetInput {
  client?: Client
  id: Uuid
  statuses?: string
}

type RetriggerOrgDatasetReturn = void

/**
 * Request a retrigger of conversions for a dataset that belongs to the caller's org.
 *
 * Tags: orgs
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The identifier. (path)
 * @property {string} statuses Optional comma-separated set of conversion statuses to retrigger.
 *
 * Example: `statuses=success,in_progress` If omitted, we retrigger all non-success conversions, but only retrigger `in_progress` conversions that have been running for more than 5 minutes. (query)
 * @returns {Promise<RetriggerOrgDatasetReturn>} resource updated
 */
export default async function retrigger_org_dataset({
  client,
  id,
  statuses,
}: RetriggerOrgDatasetInput): Promise<RetriggerOrgDatasetReturn> {
  const path = `/org/datasets/${id}/retrigger`
  const qs = buildQuery({ statuses: statuses })
  const url = path + qs
  // Backwards compatible for the BASE_URL env variable
  // That used to exist in only this lib, ZOO_HOST exists in the all the other
  // sdks and the CLI.
  const env = (
    globalThis as typeof globalThis & {
      process?: { env?: Record<string, string | undefined> }
    }
  ).process?.env
  const urlBase =
    client?.baseUrl || env?.ZOO_HOST || env?.BASE_URL || 'https://api.zoo.dev'
  const fullUrl = urlBase + url
  // The other sdks use to use KITTYCAD_API_TOKEN, now they still do for
  // backwards compatibility, but the new standard is ZOO_API_TOKEN.
  // For some reason only this lib supported KITTYCAD_TOKEN, so we need to
  // check for that as well.
  const kittycadToken = client
    ? client.token || env?.ZOO_API_TOKEN || ''
    : env?.KITTYCAD_TOKEN || env?.KITTYCAD_API_TOKEN || env?.ZOO_API_TOKEN || ''
  const headers: Record<string, string> = {}
  if (kittycadToken) headers.Authorization = `Bearer ${kittycadToken}`
  const fetchOptions: RequestInit = {
    method: 'POST',
    headers,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  return undefined as RetriggerOrgDatasetReturn
}
