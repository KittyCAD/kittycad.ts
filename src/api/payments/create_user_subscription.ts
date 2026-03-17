import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {
  ZooProductSubscriptions,
  ZooProductSubscriptionsUserRequest,
} from '../../models.js'

interface CreateUserSubscriptionInput {
  client?: Client
  body: ZooProductSubscriptionsUserRequest
}

type CreateUserSubscriptionReturn = ZooProductSubscriptions

/**
 * Create the subscription for a user.
 *
 * This endpoint requires authentication by any Zoo user. It creates the subscription for the user.
 *
 * Tags: payments
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {ZooProductSubscriptionsUserRequest} body Request body payload
 * @returns {Promise<CreateUserSubscriptionReturn>} successful creation
 *
 * Possible return types: ZooProductSubscriptions
 */
export default async function create_user_subscription({
  client,
  body,
}: CreateUserSubscriptionInput): Promise<CreateUserSubscriptionReturn> {
  const path = `/user/payment/subscriptions`
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
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as CreateUserSubscriptionReturn
  return result
}
