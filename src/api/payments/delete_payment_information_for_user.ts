import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {} from '../../models.js'

interface DeletePaymentInformationForUserInput {
  client?: Client
}

type DeletePaymentInformationForUserReturn = void

/**
 * Delete payment info for your user.
 *
 * This includes billing address, phone, and name.
 *
 * This endpoint requires authentication by any Zoo user. It deletes the payment information for the authenticated user.
 *
 * Tags: payments
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @returns {Promise<DeletePaymentInformationForUserReturn>} successful deletion
 */
export default async function delete_payment_information_for_user(
  {
    client,
  }: DeletePaymentInformationForUserInput = {} as DeletePaymentInformationForUserInput
): Promise<DeletePaymentInformationForUserReturn> {
  const path = `/user/payment`
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
  return undefined as DeletePaymentInformationForUserReturn
}
