import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {
  ZooProductSubscriptions,
  Uuid,
  ZooProductSubscriptionsOrgRequest,
} from '../../models.js'

interface UpdateOrgSubscriptionForAnyOrgInput {
  client?: Client
  id: Uuid
  body: ZooProductSubscriptionsOrgRequest
}

type UpdateOrgSubscriptionForAnyOrgReturn = ZooProductSubscriptions

/**
 * Update the subscription for any org (admin override).
 *
 * This endpoint requires authentication by a Zoo admin. It updates the subscription for the specified org.
 *
 * Tags: payments, hidden
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The organization ID. (path)
 * @property {ZooProductSubscriptionsOrgRequest} body Request body payload
 * @returns {Promise<UpdateOrgSubscriptionForAnyOrgReturn>} successful operation
 *
 * Possible return types: ZooProductSubscriptions
 */
export default async function update_org_subscription_for_any_org({
  client,
  id,
  body,
}: UpdateOrgSubscriptionForAnyOrgInput): Promise<UpdateOrgSubscriptionForAnyOrgReturn> {
  const path = `/orgs/${id}/payment/subscriptions`
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
  const result = (await response.json()) as UpdateOrgSubscriptionForAnyOrgReturn
  return result
}
