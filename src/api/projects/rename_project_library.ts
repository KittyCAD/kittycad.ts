import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {
  ProjectLibraryResponse,
  Uuid,
  RenameProjectLibraryRequest,
} from '../../models.js'

interface RenameProjectLibraryInput {
  client?: Client
  id: Uuid
  body: RenameProjectLibraryRequest
}

type RenameProjectLibraryReturn = ProjectLibraryResponse

/**
 * Rename a library owned by the user or their active organization.
 *
 * Tags: projects
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The identifier. (path)
 * @property {RenameProjectLibraryRequest} body Request body payload
 * @returns {Promise<RenameProjectLibraryReturn>} successful operation
 *
 * Possible return types: ProjectLibraryResponse
 */
export default async function rename_project_library({
  client,
  id,
  body,
}: RenameProjectLibraryInput): Promise<RenameProjectLibraryReturn> {
  const path = `/user/project-libraries/${id}`
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
    method: 'PATCH',
    headers,
    body: JSON.stringify(body),
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as RenameProjectLibraryReturn
  return result
}
