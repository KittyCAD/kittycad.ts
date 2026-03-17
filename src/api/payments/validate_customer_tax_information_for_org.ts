import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {} from '../../models.js'

interface ValidateCustomerTaxInformationForOrgInput {
  client?: Client
}

type ValidateCustomerTaxInformationForOrgReturn = void

/**
 * Validate an orgs's information is correct and valid for automatic tax.
 *
 * This endpoint requires authentication by an org admin. It will return an error if the org's information is not valid for automatic tax. Otherwise, it will return an empty successful response.
 *
 * Tags: payments, hidden
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @returns {Promise<ValidateCustomerTaxInformationForOrgReturn>} successful operation, no content
 */
export default async function validate_customer_tax_information_for_org(
  {
    client,
  }: ValidateCustomerTaxInformationForOrgInput = {} as ValidateCustomerTaxInformationForOrgInput
): Promise<ValidateCustomerTaxInformationForOrgReturn> {
  const path = `/org/payment/tax`
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
  return undefined as ValidateCustomerTaxInformationForOrgReturn
}
