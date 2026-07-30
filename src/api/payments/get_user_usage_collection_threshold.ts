import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { AggregateUsageCollectionThresholdView } from '../../models.js'

interface GetUserUsageCollectionThresholdInput {
  client?: Client
}

type GetUserUsageCollectionThresholdReturn =
  AggregateUsageCollectionThresholdView

/**
 * Get your personal aggregate-usage collection threshold.
 *
 * The effective threshold is the amount of accrued, unfunded usage that causes an early invoice before the normal billing-period close.
 *
 * Tags: payments
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @returns {Promise<GetUserUsageCollectionThresholdReturn>} successful operation
 *
 * Possible return types: AggregateUsageCollectionThresholdView
 */
export default async function get_user_usage_collection_threshold(
  {
    client,
  }: GetUserUsageCollectionThresholdInput = {} as GetUserUsageCollectionThresholdInput
): Promise<GetUserUsageCollectionThresholdReturn> {
  const path = `/user/billing/usage-collection-threshold`
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
  const result =
    (await response.json()) as GetUserUsageCollectionThresholdReturn
  return result
}
