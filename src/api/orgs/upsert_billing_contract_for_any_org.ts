import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {
  BillingContractView,
  Uuid,
  BillingContractUpsert,
} from '../../models.js'

interface UpsertBillingContractForAnyOrgInput {
  client?: Client
  id: Uuid
  body: BillingContractUpsert
}

type UpsertBillingContractForAnyOrgReturn = BillingContractView

/**
 * Create or replace the billing contract for an organization.
 *
 * This endpoint requires Zoo admin authentication. It upserts the contract definition used for admin-managed enterprise billing.
 *
 * Tags: orgs, hidden
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The organization ID. (path)
 * @property {BillingContractUpsert} body Request body payload
 * @returns {Promise<UpsertBillingContractForAnyOrgReturn>} successful operation
 *
 * Possible return types: BillingContractView
 */
export default async function upsert_billing_contract_for_any_org({
  client,
  id,
  body,
}: UpsertBillingContractForAnyOrgInput): Promise<UpsertBillingContractForAnyOrgReturn> {
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
  headers['Content-Type'] = 'application/json'
  const fetchOptions: RequestInit = {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as UpsertBillingContractForAnyOrgReturn
  return result
}
