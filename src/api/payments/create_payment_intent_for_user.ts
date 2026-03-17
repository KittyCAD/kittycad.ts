import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { PaymentIntent } from '../../models.js'

interface CreatePaymentIntentForUserInput {
  client?: Client
}

type CreatePaymentIntentForUserReturn = PaymentIntent

/**
 * Create a payment intent for your user.
 *
 * This endpoint requires authentication by any Zoo user. It creates a new payment intent for the authenticated user.
 *
 * Tags: payments, hidden
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @returns {Promise<CreatePaymentIntentForUserReturn>} successful creation
 *
 * Possible return types: PaymentIntent
 */
export default async function create_payment_intent_for_user(
  {
    client,
  }: CreatePaymentIntentForUserInput = {} as CreatePaymentIntentForUserInput
): Promise<CreatePaymentIntentForUserReturn> {
  const path = `/user/payment/intent`
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
  const result = (await response.json()) as CreatePaymentIntentForUserReturn
  return result
}
