import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { Uuid } from '../../models.js'

interface GetUserFactoryJobFileInput {
  client?: Client
  job_id: Uuid
  file_id: Uuid
}

type GetUserFactoryJobFileReturn = unknown

/**
 * Download an exact submitted manufacturing input of a personal Factory job.
 *
 * Tags: factory
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} job_id Stable job identifier. (path)
 * @property {Uuid} file_id Submitted file identifier. (path)
 * @returns {Promise<GetUserFactoryJobFileReturn>} Response payload.
 */
export default async function get_user_factory_job_file({
  client,
  job_id,
  file_id,
}: GetUserFactoryJobFileInput): Promise<GetUserFactoryJobFileReturn> {
  const path = `/user/factory/jobs/${job_id}/files/${file_id}`
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
  const result = (await response.json()) as GetUserFactoryJobFileReturn
  return result
}
