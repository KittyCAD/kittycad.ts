import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { ProjectResponse, Uuid } from '../../models.js'

interface UpdateProjectOrganizationInput {
  client?: Client
  id: Uuid
}

type UpdateProjectOrganizationReturn = ProjectResponse

/**
 * Move one of the authenticated user's projects into their active organization library.
 *
 * This changes only the project's ownership scope. The project ID, current revision, files, and version history remain unchanged so cloud bindings stay valid across the move.
 *
 * Tags: projects
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The identifier. (path)
 * @returns {Promise<UpdateProjectOrganizationReturn>} successful operation
 *
 * Possible return types: ProjectResponse
 */
export default async function update_project_organization({
  client,
  id,
}: UpdateProjectOrganizationInput): Promise<UpdateProjectOrganizationReturn> {
  const path = `/user/projects/${id}/organization`
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
    method: 'PUT',
    headers,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as UpdateProjectOrganizationReturn
  return result
}
