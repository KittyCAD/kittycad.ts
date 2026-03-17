import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {
  ZooProductSubscriptions,
  ZooProductSubscriptionsOrgRequest,
} from '../../models.js'

interface UpdateOrgSubscriptionInput {
  client?: Client
  body: ZooProductSubscriptionsOrgRequest
}

type UpdateOrgSubscriptionReturn = ZooProductSubscriptions

/**
 * Update the subscription for an org.
 *
 * This endpoint requires authentication by an org admin. It updates the subscription for the authenticated user's org.
 *
 * Tags: payments
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {ZooProductSubscriptionsOrgRequest} body Request body payload
 * @returns {Promise<UpdateOrgSubscriptionReturn>} successful operation
 *
 * Possible return types: ZooProductSubscriptions
 */
export default async function update_org_subscription({
  client,
  body,
}: UpdateOrgSubscriptionInput): Promise<UpdateOrgSubscriptionReturn> {
  const path = `/org/payment/subscriptions`
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
  const result = (await response.json()) as UpdateOrgSubscriptionReturn
  return result
}
