import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { ExecutionLogResponse, Uuid, ExecutionLogStream } from '../../models.js'

interface GetExecutionJobLogsInput {
  client?: Client
  id: Uuid
  stream?: ExecutionLogStream
  offset?: number
  limit?: number
}

type GetExecutionJobLogsReturn = ExecutionLogResponse

/**
 * Read a bounded binary-safe page from a verified execution log archive.
 *
 * Tags: executor
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The identifier. (path)
 * @property {ExecutionLogStream} stream Which stream to read; defaults to stdout. (query)
 * @property {number} offset Byte offset, starting at zero. (query)
 * @property {number} limit Maximum returned bytes, 1 through 65536 (default 65536). (query)
 * @returns {Promise<GetExecutionJobLogsReturn>} successful operation
 *
 * Possible return types: ExecutionLogResponse
 */
export default async function get_execution_job_logs({
  client,
  id,
  stream,
  offset,
  limit,
}: GetExecutionJobLogsInput): Promise<GetExecutionJobLogsReturn> {
  const path = `/execution/jobs/${id}/logs`
  const qs = buildQuery({ stream: stream, offset: offset, limit: limit })
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
  const result = (await response.json()) as GetExecutionJobLogsReturn
  return result
}
