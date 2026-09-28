import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { ProjectVersionDetailResponse, Uuid } from '../../models.js'

interface GetProjectVersionInput {
  client?: Client
  id: Uuid
  version_id: Uuid
}

type GetProjectVersionReturn = ProjectVersionDetailResponse

/**
 * Get metadata and files for a single saved project version.
 *
 * Tags: projects
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id Project identifier. (path)
 * @property {Uuid} version_id Requested version identifier. (path)
 * @returns {Promise<GetProjectVersionReturn>} successful operation
 *
 * Possible return types: ProjectVersionDetailResponse
 */
export default async function get_project_version({
  client,
  id,
  version_id,
}: GetProjectVersionInput): Promise<GetProjectVersionReturn> {
  const path = `/user/projects/${id}/versions/${version_id}`
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
  const result = (await response.json()) as GetProjectVersionReturn
  return result
}
