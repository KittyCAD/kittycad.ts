import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { ZooProductSubscriptions } from '../../models.js'

interface GetOrgSubscriptionInput {
  client?: Client
}

type GetOrgSubscriptionReturn = ZooProductSubscriptions

/**
 * Get the subscription for an org.
 *
 * This endpoint requires authentication by any member of an org. It gets the subscription for the authenticated user's org.
 *
 * Tags: payments
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @returns {Promise<GetOrgSubscriptionReturn>} successful operation
 *
 * Possible return types: ZooProductSubscriptions
 */
export default async function get_org_subscription(
  { client }: GetOrgSubscriptionInput = {} as GetOrgSubscriptionInput
): Promise<GetOrgSubscriptionReturn> {
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
  const fetchOptions: RequestInit = {
    method: 'GET',
    headers,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as GetOrgSubscriptionReturn
  return result
}
