import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {
  ProjectResponse,
  Uuid,
  UpdateProjectLibraryRequest,
} from '../../models.js'

interface UpdateProjectLibraryInput {
  client?: Client
  id: Uuid
  body: UpdateProjectLibraryRequest
}

type UpdateProjectLibraryReturn = ProjectResponse

/**
 * Move a project to a named library or leave it unassigned.
 *
 * Tags: projects
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The identifier. (path)
 * @property {UpdateProjectLibraryRequest} body Request body payload
 * @returns {Promise<UpdateProjectLibraryReturn>} successful operation
 *
 * Possible return types: ProjectResponse
 */
export default async function update_project_library({
  client,
  id,
  body,
}: UpdateProjectLibraryInput): Promise<UpdateProjectLibraryReturn> {
  const path = `/user/projects/${id}/library`
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
  const fetchOptions: RequestInit = {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as UpdateProjectLibraryReturn
  return result
}
