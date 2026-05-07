import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {} from '../../models.js'

interface DeletePaymentMethodForUserInput {
  client?: Client
  id: string
}

type DeletePaymentMethodForUserReturn = void

/**
 * Delete a payment method for your user.
 *
 * This endpoint requires authentication by any Zoo user. It deletes the specified payment method for the authenticated user.
 *
 * Tags: payments, hidden
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {string} id Stripe payment method identifier. (path)
 * @returns {Promise<DeletePaymentMethodForUserReturn>} successful deletion
 */
export default async function delete_payment_method_for_user({
  client,
  id,
}: DeletePaymentMethodForUserInput): Promise<DeletePaymentMethodForUserReturn> {
  const path = `/user/payment/methods/${id}`
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
    method: 'DELETE',
    headers,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  return undefined as DeletePaymentMethodForUserReturn
}
