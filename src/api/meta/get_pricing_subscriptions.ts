import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { ZooProductSubscription } from '../../models.js'

interface GetPricingSubscriptionsInput {
  client?: Client
}

type GetPricingSubscriptionsReturn = Record<string, ZooProductSubscription[]>

/**
 * Get the pricing for our subscriptions.
 *
 * This is the ultimate source of truth for the pricing of our subscriptions.
 *
 * Tags: meta, hidden
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @returns {Promise<GetPricingSubscriptionsReturn>} successful operation
 *
 * Possible return types: ZooProductSubscription
 */
export default async function get_pricing_subscriptions(
  { client }: GetPricingSubscriptionsInput = {} as GetPricingSubscriptionsInput
): Promise<GetPricingSubscriptionsReturn> {
  const path = `/pricing/subscriptions`
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
  const result = (await response.json()) as GetPricingSubscriptionsReturn
  return result
}
