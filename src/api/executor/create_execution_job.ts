import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {
  ExecutionJobResponse,
  ExecutionJobCreateRequest,
} from '../../models.js'

interface CreateExecutionJobInput {
  client?: Client
  idempotency_key: string
  body: ExecutionJobCreateRequest
}

type CreateExecutionJobReturn = ExecutionJobResponse

/**
 * Submit an execution job.
 *
 * Requires the execution_jobs feature for the active user or organization. Retry a submission with the same Idempotency-Key and request body to recover the original job.
 *
 * Tags: executor
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {string} idempotency_key Reuse this key with the same request body to recover the original submission. (header)
 * @property {ExecutionJobCreateRequest} body Request body payload
 * @returns {Promise<CreateExecutionJobReturn>} successful creation
 *
 * Possible return types: ExecutionJobResponse
 */
export default async function create_execution_job({
  client,
  idempotency_key,
  body,
}: CreateExecutionJobInput): Promise<CreateExecutionJobReturn> {
  const path = `/execution/jobs`
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
  if (idempotency_key !== undefined)
    headers['Idempotency-Key'] = String(idempotency_key)
  const fetchOptions: RequestInit = {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as CreateExecutionJobReturn
  return result
}
