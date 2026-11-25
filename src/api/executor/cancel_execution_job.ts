import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { ExecutionJobResponse, Uuid } from '../../models.js'

interface CancelExecutionJobInput {
  client?: Client
  id: Uuid
}

type CancelExecutionJobReturn = ExecutionJobResponse

/**
 * Idempotently request cancellation of an execution job.
 *
 * Tags: executor
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The identifier. (path)
 * @returns {Promise<CancelExecutionJobReturn>} successful operation
 *
 * Possible return types: ExecutionJobResponse
 */
export default async function cancel_execution_job({
  client,
  id,
}: CancelExecutionJobInput): Promise<CancelExecutionJobReturn> {
  const path = `/execution/jobs/${id}/cancel`
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
  const result = (await response.json()) as CancelExecutionJobReturn
  return result
}
