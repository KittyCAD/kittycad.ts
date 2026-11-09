import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { Uuid } from '../../models.js'

interface GetUserFactoryJobThumbnailInput {
  client?: Client
  job_id: Uuid
  version_id: Uuid
}

type GetUserFactoryJobThumbnailReturn = unknown

/**
 * Fetch the private thumbnail pinned by a personal Factory revision.
 *
 * Tags: factory
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} job_id Stable job identifier. (path)
 * @property {Uuid} version_id Factory revision identifier, not a Project version identifier. (path)
 * @returns {Promise<GetUserFactoryJobThumbnailReturn>} Response payload.
 */
export default async function get_user_factory_job_thumbnail({
  client,
  job_id,
  version_id,
}: GetUserFactoryJobThumbnailInput): Promise<GetUserFactoryJobThumbnailReturn> {
  const path = `/user/factory/jobs/${job_id}/versions/${version_id}/thumbnail`
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
  const result = (await response.json()) as GetUserFactoryJobThumbnailReturn
  return result
}
