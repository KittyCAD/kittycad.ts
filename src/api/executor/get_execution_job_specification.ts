import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { ExecutionJobSpecificationResponse, Uuid } from '../../models.js'

interface GetExecutionJobSpecificationInput {
  client?: Client
  id: Uuid
}

type GetExecutionJobSpecificationReturn = ExecutionJobSpecificationResponse

/**
 * Get immutable execution inputs. Lifecycle polling does not require this object.
 *
 * Tags: executor
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The identifier. (path)
 * @returns {Promise<GetExecutionJobSpecificationReturn>} successful operation
 *
 * Possible return types: ExecutionJobSpecificationResponse
 */
export default async function get_execution_job_specification({
  client,
  id,
}: GetExecutionJobSpecificationInput): Promise<GetExecutionJobSpecificationReturn> {
  const path = `/execution/jobs/${id}/specification`
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
  const result = (await response.json()) as GetExecutionJobSpecificationReturn
  return result
}
