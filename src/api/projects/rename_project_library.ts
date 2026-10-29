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
 * Send JSON containing `name` and `expected_revision`, using the library's `revision` from the last library list response. The personal owner or an admin of the active organization can rename the library. Names follow the same validation and uniqueness rules as library creation.
 *
 * HTTP 200 returns the updated library and revision. A stale revision or duplicate name returns HTTP 409; refresh the library list before deciding whether to retry. Renaming keeps the library ID, ownership, and project assignments unchanged.
 *
 * Renaming doesn't change the library's source.
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
