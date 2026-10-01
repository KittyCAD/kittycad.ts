import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { collectApiList } from '../../pagination.js'

import { PaymentMethod } from '../../models.js'

interface ListPaymentMethodsForOrgInput {
  client?: Client
  signal?: AbortSignal
}

type ListPaymentMethodsForOrgReturn = PaymentMethod[]

/**
 * List payment methods for your org.
 *
 * This endpoint requires authentication by an org admin. It lists payment methods for the authenticated user's org.
 *
 * Accepts legacy collections or items/next_page responses and reads all pages.
 * Rejects failed, malformed, or repeated pages without returning partial results.
 *
 * Tags: payments
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {AbortSignal} [signal] Cancel the entire list request.
 * @returns {Promise<ListPaymentMethodsForOrgReturn>} successful operation
 *
 * Possible return types: PaymentMethod[]
 */
export default async function list_payment_methods_for_org(
  {
    client,
    signal,
  }: ListPaymentMethodsForOrgInput = {} as ListPaymentMethodsForOrgInput
): Promise<ListPaymentMethodsForOrgReturn> {
  const path = `/org/payment/methods`
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
    signal,
  }
  const _fetch = client?.fetch || fetch
  const items = await collectApiList<ListPaymentMethodsForOrgReturn[number]>(
    fullUrl,
    async (pageUrl) => {
      const response = await _fetch(pageUrl, fetchOptions)
      await throwIfNotOk(response)
      return response.json()
    }
  )
  return items
}
