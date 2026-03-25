import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { ProjectResponse, Uuid } from '../../models.js'

interface GetUserProjectInput {
  client?: Client
  id: Uuid
}

type GetUserProjectReturn = ProjectResponse

/**
 * Get one of the authenticated user's projects.
 *
 * Tags: users
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The identifier. (path)
 * @returns {Promise<GetUserProjectReturn>} successful operation
 *
 * Possible return types: ProjectResponse
 */
export default async function get_user_project({
  client,
  id,
}: GetUserProjectInput): Promise<GetUserProjectReturn> {
  const path = `/user/projects/${id}`
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
  const result = (await response.json()) as GetUserProjectReturn
  return result
}
