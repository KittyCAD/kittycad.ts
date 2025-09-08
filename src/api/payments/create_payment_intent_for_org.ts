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
  const urlBase =
    client?.baseUrl ||
    process?.env?.ZOO_HOST ||
    process?.env?.BASE_URL ||
    'https://api.zoo.dev'
  const fullUrl = urlBase + url
  // The other sdks use to use KITTYCAD_API_TOKEN, now they still do for
  // backwards compatibility, but the new standard is ZOO_API_TOKEN.
  // For some reason only this lib supported KITTYCAD_TOKEN, so we need to
  // check for that as well.
  const kittycadToken = client
    ? client.token || process.env.ZOO_API_TOKEN || ''
    : process.env.KITTYCAD_TOKEN ||
      process.env.KITTYCAD_API_TOKEN ||
      process.env.ZOO_API_TOKEN ||
      ''
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
