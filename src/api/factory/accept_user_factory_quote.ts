import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { FactoryQuoteAcceptance, Uuid } from '../../models.js'

interface AcceptUserFactoryQuoteInput {
  client?: Client
  job_id: Uuid
  quote_id: Uuid
  payment_attempt_id: Uuid
  use_credits?: boolean
  max_amount_due_cents?: number
}

type AcceptUserFactoryQuoteReturn = FactoryQuoteAcceptance

/**
 * Accept your current Factory quote and immediately charge your default card. Production starts only after successful payment.
 *
 * Tags: factory
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} job_id The manufacturing job being purchased. (path)
 * @property {Uuid} quote_id The exact published quote accepted by the customer. (path)
 * @property {Uuid} payment_attempt_id Generate once for an explicit acceptance and reuse for every transport retry. A new attempt after a confirmed decline requires a new UUID. (query)
 * @property {boolean} use_credits Apply available Zoo usage credits to this purchase before charging the default card. (query)
 * @property {number} max_amount_due_cents Maximum cash payment confirmed by the customer from the checkout preview. If the amount increases, refresh the preview before retrying acceptance. (query)
 * @returns {Promise<AcceptUserFactoryQuoteReturn>} successful operation
 *
 * Possible return types: FactoryQuoteAcceptance
 */
export default async function accept_user_factory_quote({
  client,
  job_id,
  quote_id,
  payment_attempt_id,
  use_credits,
  max_amount_due_cents,
}: AcceptUserFactoryQuoteInput): Promise<AcceptUserFactoryQuoteReturn> {
  const path = `/user/factory/jobs/${job_id}/quotes/${quote_id}/accept`
  const qs = buildQuery({
    payment_attempt_id: payment_attempt_id,
    use_credits: use_credits,
    max_amount_due_cents: max_amount_due_cents,
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
    method: 'POST',
    headers,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as AcceptUserFactoryQuoteReturn
  return result
}
