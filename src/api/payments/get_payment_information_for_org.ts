import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { Customer } from '../../models.js'

interface GetPaymentInformationForOrgInput {
  client?: Client
}

type GetPaymentInformationForOrgReturn = Customer

/**
 * Get payment info about your org.
 *
 * This includes billing address, phone, and name.
 *
 * This endpoint requires authentication by an org admin. It gets the payment information for the authenticated user's org.
 *
 * Tags: payments
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @returns {Promise<GetPaymentInformationForOrgReturn>} successful operation
 *
 * Possible return types: Customer
 */
export default async function get_payment_information_for_org(
  {
    client,
  }: GetPaymentInformationForOrgInput = {} as GetPaymentInformationForOrgInput
): Promise<GetPaymentInformationForOrgReturn> {
  const path = `/org/payment`
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
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as GetPaymentInformationForOrgReturn
  return result
}
