import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'
import { Pager, createPager } from '../../pagination.js'

import { InvoiceResultsPage, Invoice } from '../../models.js'

interface ListInvoicesForUserInput {
  client?: Client
  limit?: number
  page_token?: string
}

type ListInvoicesForUserReturn = InvoiceResultsPage

/**
 * List invoices for your user.
 *
 * This endpoint requires authentication by any Zoo user. It lists invoices for the authenticated user.
 *
 * Tags: payments
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {number} limit Maximum number of items returned by a single call (query)
 * @property {string} page_token Token returned by previous call to retrieve the subsequent page (query)
 * @returns {Promise<ListInvoicesForUserReturn>} successful operation
 *
 * Possible return types: InvoiceResultsPage
 */
export default async function list_invoices_for_user({
  client,
  limit,
  page_token,
}: ListInvoicesForUserInput): Promise<ListInvoicesForUserReturn> {
  const path = `/user/payment/invoices`
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
  const result = (await response.json()) as ListInvoicesForUserReturn
  return result
}

export function list_invoices_for_user_pager(
  params: ListInvoicesForUserInput
): Pager<ListInvoicesForUserInput, ListInvoicesForUserReturn, Invoice> {
  return createPager<
    ListInvoicesForUserInput,
    ListInvoicesForUserReturn,
    Invoice
  >(list_invoices_for_user, params, 'page_token')
}
