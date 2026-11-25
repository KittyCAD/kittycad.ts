import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {} from '../../models.js'

interface SetDefaultPaymentMethodForOrgInput {
  client?: Client
  id: string
}

type SetDefaultPaymentMethodForOrgReturn = void

/**
 * Set the default payment method for your org.
 *
 * This endpoint requires authentication by an org admin. It sets the default payment method for the authenticated user's org.
 *
 * Tags: payments
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {string} id Stripe payment method identifier. (path)
 * @returns {Promise<SetDefaultPaymentMethodForOrgReturn>} successful operation, no content
 */
export default async function set_default_payment_method_for_org({
  client,
  id,
}: SetDefaultPaymentMethodForOrgInput): Promise<SetDefaultPaymentMethodForOrgReturn> {
  const path = `/org/payment/methods/${id}/default`
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
  return undefined as SetDefaultPaymentMethodForOrgReturn
}
