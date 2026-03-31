import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { BillingContractView, Uuid } from '../../models.js'

interface GetBillingContractForAnyOrgInput {
  client?: Client
  id: Uuid
}

type GetBillingContractForAnyOrgReturn = BillingContractView

/**
 * Get the billing contract for an organization.
 *
 * This endpoint requires Zoo admin authentication. It returns the active contract for the organization, or the latest draft when no active contract exists.
 *
 * Tags: orgs, hidden
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The organization ID. (path)
 * @returns {Promise<GetBillingContractForAnyOrgReturn>} successful operation
 *
 * Possible return types: BillingContractView
 */
export default async function get_billing_contract_for_any_org({
  client,
  id,
}: GetBillingContractForAnyOrgInput): Promise<GetBillingContractForAnyOrgReturn> {
  const path = `/orgs/${id}/billing/contract`
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
  const result = (await response.json()) as GetBillingContractForAnyOrgReturn
  return result
}
