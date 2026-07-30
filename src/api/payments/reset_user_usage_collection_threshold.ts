import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { AggregateUsageCollectionThresholdView } from '../../models.js'

interface ResetUserUsageCollectionThresholdInput {
  client?: Client
  expected_version: number
}

type ResetUserUsageCollectionThresholdReturn =
  AggregateUsageCollectionThresholdView

/**
 * Restore the default for your personal aggregate-usage collection threshold.
 *
 * Tags: payments
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {number} expected_version Version returned by the read that this mutation is based on. (query)
 * @returns {Promise<ResetUserUsageCollectionThresholdReturn>} successful operation
 *
 * Possible return types: AggregateUsageCollectionThresholdView
 */
export default async function reset_user_usage_collection_threshold({
  client,
  expected_version,
}: ResetUserUsageCollectionThresholdInput): Promise<ResetUserUsageCollectionThresholdReturn> {
  const path = `/user/billing/usage-collection-threshold`
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
    (await response.json()) as ResetUserUsageCollectionThresholdReturn
  return result
}
