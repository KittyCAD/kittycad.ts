import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {} from '../../models.js'

interface RedirectPaymentMethodPortalLinkForOrgInput {
  client?: Client
  return_url?: string
}

type RedirectPaymentMethodPortalLinkForOrgReturn = unknown

/**
 * Redirect to a fresh Stripe-hosted payment-method update link for your org.
 *
 * If the request is not authenticated, this redirects to website login with a callback back to this endpoint. If authenticated as an org admin, it creates a fresh hosted Stripe portal session and redirects the browser to it.
 *
 * Tags: payments
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {string} return_url The URL Stripe should offer after the hosted flow completes.
 *
 * If omitted, this defaults to the account page. (query)
 * @returns {Promise<RedirectPaymentMethodPortalLinkForOrgReturn>} Temporary Redirect
 */
export default async function redirect_payment_method_portal_link_for_org({
  client,
  return_url,
}: RedirectPaymentMethodPortalLinkForOrgInput): Promise<RedirectPaymentMethodPortalLinkForOrgReturn> {
  const path = `/org/payment/method-portal-link`
  const qs = buildQuery({ return_url: return_url })
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
  const result =
    (await response.json()) as RedirectPaymentMethodPortalLinkForOrgReturn
  return result
}
