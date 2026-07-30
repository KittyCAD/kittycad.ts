import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { AggregateUsageCollectionThresholdView } from '../../models.js'

interface GetOrgUsageCollectionThresholdInput {
  client?: Client
}

type GetOrgUsageCollectionThresholdReturn =
  AggregateUsageCollectionThresholdView

/**
 * Get the authenticated organization's aggregate-usage collection threshold.
 *
 * Tags: payments, orgs
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @returns {Promise<GetOrgUsageCollectionThresholdReturn>} successful operation
 *
 * Possible return types: AggregateUsageCollectionThresholdView
 */
export default async function get_org_usage_collection_threshold(
  {
    client,
  }: GetOrgUsageCollectionThresholdInput = {} as GetOrgUsageCollectionThresholdInput
): Promise<GetOrgUsageCollectionThresholdReturn> {
  const path = `/org/billing/usage-collection-threshold`
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
  const result = (await response.json()) as GetOrgUsageCollectionThresholdReturn
  return result
}
