import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'
import { Pager, createPager } from '../../pagination.js'

import { PaymentMethodResultsPage, PaymentMethod } from '../../models.js'

interface ListPaymentMethodsForUserInput {
  client?: Client
  limit?: number
  page_token?: string
}

type ListPaymentMethodsForUserReturn = PaymentMethodResultsPage

/**
 * List payment methods for your user.
 *
 * This endpoint requires authentication by any Zoo user. It lists payment methods for the authenticated user, with the valid default card first.
 *
 * Tags: payments
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {number} limit Maximum number of items returned by a single call (query)
 * @property {string} page_token Token returned by previous call to retrieve the subsequent page (query)
 * @returns {Promise<ListPaymentMethodsForUserReturn>} successful operation
 *
 * Possible return types: PaymentMethodResultsPage
 */
export default async function list_payment_methods_for_user({
  client,
  limit,
  page_token,
}: ListPaymentMethodsForUserInput): Promise<ListPaymentMethodsForUserReturn> {
  const path = `/user/payment/methods`
  const qs = buildQuery({ limit: limit, page_token: page_token })
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
  const result = (await response.json()) as ListPaymentMethodsForUserReturn
  return result
}

export function list_payment_methods_for_user_pager(
  params: ListPaymentMethodsForUserInput
): Pager<
  ListPaymentMethodsForUserInput,
  ListPaymentMethodsForUserReturn,
  PaymentMethod
> {
  return createPager<
    ListPaymentMethodsForUserInput,
    ListPaymentMethodsForUserReturn,
    PaymentMethod
  >(list_payment_methods_for_user, params, 'page_token')
}
