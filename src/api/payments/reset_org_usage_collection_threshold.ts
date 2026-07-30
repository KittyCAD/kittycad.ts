import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { AggregateUsageCollectionThresholdView } from '../../models.js'

interface ResetOrgUsageCollectionThresholdInput {
  client?: Client
  expected_version: number
}

type ResetOrgUsageCollectionThresholdReturn =
  AggregateUsageCollectionThresholdView

/**
 * Restore the default for the authenticated organization's aggregate-usage collection threshold.
 *
 * Tags: payments, orgs
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {number} expected_version Version returned by the read that this mutation is based on. (query)
 * @returns {Promise<ResetOrgUsageCollectionThresholdReturn>} successful operation
 *
 * Possible return types: AggregateUsageCollectionThresholdView
 */
export default async function reset_org_usage_collection_threshold({
  client,
  expected_version,
}: ResetOrgUsageCollectionThresholdInput): Promise<ResetOrgUsageCollectionThresholdReturn> {
  const path = `/org/billing/usage-collection-threshold`
  const qs = buildQuery({ expected_version: expected_version })
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
    method: 'DELETE',
    headers,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result =
    (await response.json()) as ResetOrgUsageCollectionThresholdReturn
  return result
}
