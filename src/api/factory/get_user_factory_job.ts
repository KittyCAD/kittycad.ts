import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { FactoryCustomerJobDetail, Uuid } from '../../models.js'

interface GetUserFactoryJobInput {
  client?: Client
  job_id: Uuid
}

type GetUserFactoryJobReturn = FactoryCustomerJobDetail

/**
 * Get a personal Factory job and its current customer-visible specifications.
 *
 * Tags: factory
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} job_id The requested job's identifier. (path)
 * @returns {Promise<GetUserFactoryJobReturn>} successful operation
 *
 * Possible return types: FactoryCustomerJobDetail
 */
export default async function get_user_factory_job({
  client,
  job_id,
}: GetUserFactoryJobInput): Promise<GetUserFactoryJobReturn> {
  const path = `/user/factory/jobs/${job_id}`
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
  const result = (await response.json()) as GetUserFactoryJobReturn
  return result
}
