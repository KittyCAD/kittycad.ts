import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { FactoryQuoteAcceptance, Uuid } from '../../models.js'

interface AcceptOrgFactoryQuoteInput {
  client?: Client
  job_id: Uuid
  quote_id: Uuid
}

type AcceptOrgFactoryQuoteReturn = FactoryQuoteAcceptance

/**
 * Accept your organization's current Factory quote and charge its default card. Requires an organization administrator.
 *
 * Tags: factory
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} job_id The manufacturing job being purchased. (path)
 * @property {Uuid} quote_id The exact published quote accepted by the customer. (path)
 * @returns {Promise<AcceptOrgFactoryQuoteReturn>} successful operation
 *
 * Possible return types: FactoryQuoteAcceptance
 */
export default async function accept_org_factory_quote({
  client,
  job_id,
  quote_id,
}: AcceptOrgFactoryQuoteInput): Promise<AcceptOrgFactoryQuoteReturn> {
  const path = `/org/factory/jobs/${job_id}/quotes/${quote_id}/accept`
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
    method: 'POST',
    headers,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as AcceptOrgFactoryQuoteReturn
  return result
}
