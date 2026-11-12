import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { FactoryCustomerJobSummary, Uuid } from '../../models.js'

interface CancelUserFactoryJobInput {
  client?: Client
  job_id: Uuid
}

type CancelUserFactoryJobReturn = FactoryCustomerJobSummary

/**
 * Cancel your Factory job before payment starts, even if no quote exists.
 *
 * Tags: factory
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} job_id The requested job's identifier. (path)
 * @returns {Promise<CancelUserFactoryJobReturn>} successful operation
 *
 * Possible return types: FactoryCustomerJobSummary
 */
export default async function cancel_user_factory_job({
  client,
  job_id,
}: CancelUserFactoryJobInput): Promise<CancelUserFactoryJobReturn> {
  const path = `/user/factory/jobs/${job_id}/cancel`
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
  const result = (await response.json()) as CancelUserFactoryJobReturn
  return result
}
