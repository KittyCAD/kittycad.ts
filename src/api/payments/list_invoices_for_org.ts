import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'
import { Pager, createPager } from '../../pagination.js'

import { InvoiceResultsPage, Invoice } from '../../models.js'

interface ListInvoicesForOrgInput {
  client?: Client
  limit?: number
  page_token?: string
}

type ListInvoicesForOrgReturn = InvoiceResultsPage

/**
 * List invoices for your org.
 *
 * This endpoint requires authentication by an org admin. It lists invoices for the authenticated user's org.
 *
 * Tags: payments
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {number} limit Maximum number of items returned by a single call (query)
 * @property {string} page_token Token returned by previous call to retrieve the subsequent page (query)
 * @returns {Promise<ListInvoicesForOrgReturn>} successful operation
 *
 * Possible return types: InvoiceResultsPage
 */
export default async function list_invoices_for_org({
  client,
  limit,
  page_token,
}: ListInvoicesForOrgInput): Promise<ListInvoicesForOrgReturn> {
  const path = `/org/payment/invoices`
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
  const result = (await response.json()) as ListInvoicesForOrgReturn
  return result
}

export function list_invoices_for_org_pager(
  params: ListInvoicesForOrgInput
): Pager<ListInvoicesForOrgInput, ListInvoicesForOrgReturn, Invoice> {
  return createPager<
    ListInvoicesForOrgInput,
    ListInvoicesForOrgReturn,
    Invoice
  >(list_invoices_for_org, params, 'page_token')
}
