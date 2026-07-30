import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {
  AggregateUsageCollectionThresholdView,
  AggregateUsageCollectionThresholdSet,
} from '../../models.js'

interface SetOrgUsageCollectionThresholdInput {
  client?: Client
  body: AggregateUsageCollectionThresholdSet
}

type SetOrgUsageCollectionThresholdReturn =
  AggregateUsageCollectionThresholdView

/**
 * Set the authenticated organization's aggregate-usage collection threshold.
 *
 * Tags: payments, orgs
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {AggregateUsageCollectionThresholdSet} body Request body payload
 * @returns {Promise<SetOrgUsageCollectionThresholdReturn>} successful operation
 *
 * Possible return types: AggregateUsageCollectionThresholdView
 */
export default async function set_org_usage_collection_threshold({
  client,
  body,
}: SetOrgUsageCollectionThresholdInput): Promise<SetOrgUsageCollectionThresholdReturn> {
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
  headers['Content-Type'] = 'application/json'
  const fetchOptions: RequestInit = {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as SetOrgUsageCollectionThresholdReturn
  return result
}
