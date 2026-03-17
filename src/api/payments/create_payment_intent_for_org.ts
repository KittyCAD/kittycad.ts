import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { PaymentIntent } from '../../models.js'

interface CreatePaymentIntentForOrgInput {
  client?: Client
}

type CreatePaymentIntentForOrgReturn = PaymentIntent

/**
 * Create a payment intent for your org.
 *
 * This endpoint requires authentication by the org admin. It creates a new payment intent for the authenticated user's org's org.
 *
 * Tags: payments, hidden
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @returns {Promise<CreatePaymentIntentForOrgReturn>} successful creation
 *
 * Possible return types: PaymentIntent
 */
export default async function create_payment_intent_for_org(
  {
    client,
  }: CreatePaymentIntentForOrgInput = {} as CreatePaymentIntentForOrgInput
): Promise<CreatePaymentIntentForOrgReturn> {
  const path = `/org/payment/intent`
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
    method: 'POST',
    headers,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as CreatePaymentIntentForOrgReturn
  return result
}
