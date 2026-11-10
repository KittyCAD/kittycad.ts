import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { FactoryQuotePreview, Uuid } from '../../models.js'

interface PreviewUserFactoryQuoteInput {
  client?: Client
  job_id: Uuid
  quote_id: Uuid
  payment_attempt_id: Uuid
  use_credits?: boolean
}

type PreviewUserFactoryQuoteReturn = FactoryQuotePreview

/**
 * Preview your Factory quote's shipping, tax, credits, and total without accepting it or charging a card.
 *
 * Tags: factory
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} job_id The manufacturing job being purchased. (path)
 * @property {Uuid} quote_id The exact published quote accepted by the customer. (path)
 * @property {Uuid} payment_attempt_id Identity reused by the corresponding acceptance and its transport retries. (query)
 * @property {boolean} use_credits Include available Zoo usage credits in the checkout estimate. (query)
 * @returns {Promise<PreviewUserFactoryQuoteReturn>} successful operation
 *
 * Possible return types: FactoryQuotePreview
 */
export default async function preview_user_factory_quote({
  client,
  job_id,
  quote_id,
  payment_attempt_id,
  use_credits,
}: PreviewUserFactoryQuoteInput): Promise<PreviewUserFactoryQuoteReturn> {
  const path = `/user/factory/jobs/${job_id}/quotes/${quote_id}/preview`
  const qs = buildQuery({
    payment_attempt_id: payment_attempt_id,
    use_credits: use_credits,
  })
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
  const result = (await response.json()) as PreviewUserFactoryQuoteReturn
  return result
}
