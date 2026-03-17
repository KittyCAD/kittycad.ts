import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { ZooProductSubscriptions } from '../../models.js'

interface GetUserSubscriptionInput {
  client?: Client
}

type GetUserSubscriptionReturn = ZooProductSubscriptions

/**
 * Get the subscription for a user.
 *
 * This endpoint requires authentication by any Zoo user. It gets the subscription for the user.
 *
 * Tags: payments
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @returns {Promise<GetUserSubscriptionReturn>} successful operation
 *
 * Possible return types: ZooProductSubscriptions
 */
export default async function get_user_subscription(
  { client }: GetUserSubscriptionInput = {} as GetUserSubscriptionInput
): Promise<GetUserSubscriptionReturn> {
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
  const fetchOptions: RequestInit = {
    method: 'GET',
    headers,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as GetUserSubscriptionReturn
  return result
}
