import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {
  SubscriptionPlanPriceRecord,
  PriceUpsertRequest,
} from '../../models.js'

interface UpsertSubscriptionPlanPriceInput {
  client?: Client
  slug: string
  body: PriceUpsertRequest
}

type UpsertSubscriptionPlanPriceReturn = SubscriptionPlanPriceRecord

/**
 * Create or update a price for a subscription plan.
 *
 * You must be a Zoo admin to perform this request.
 *
 * Tags: payments, hidden
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {string} slug (path)
 * @property {PriceUpsertRequest} body Request body payload
 * @returns {Promise<UpsertSubscriptionPlanPriceReturn>} successful operation
 *
 * Possible return types: SubscriptionPlanPriceRecord
 */
export default async function upsert_subscription_plan_price({
  client,
  slug,
  body,
}: UpsertSubscriptionPlanPriceInput): Promise<UpsertSubscriptionPlanPriceReturn> {
  const path = `/subscription-plans/${slug}/prices`
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
  const result = (await response.json()) as UpsertSubscriptionPlanPriceReturn
  return result
}
