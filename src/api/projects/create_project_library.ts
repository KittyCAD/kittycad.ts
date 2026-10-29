import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {
  ProjectLibraryResponse,
  CreateProjectLibraryRequest,
} from '../../models.js'

interface CreateProjectLibraryInput {
  client?: Client
  body: CreateProjectLibraryRequest
}

type CreateProjectLibraryReturn = ProjectLibraryResponse

/**
 * Create a personal library or a library owned by the active organization.
 *
 * Send JSON with a name and explicit ownership scope:
 *
 * ```json { "name": "Designs", "scope": "personal" } ```
 *
 * Use `scope: "organization"` to create a library for the request's active organization; this requires organization-admin access. There is no organization ID in this body. Personal scope always uses the authenticated user.
 *
 * Names are trimmed, must contain 1–255 characters, and are unique ignoring case within each user or organization. Display capitalization is preserved. Duplicate names return HTTP 409. The HTTP 201 response contains the library ID, ownership, revision, and `can_manage`. Creating a library does not move existing projects; select its ID when creating a project, or move an existing project with `PUT /user/projects/{id}/library`.
 *
 * Include `source` to identify the application that created the library:
 *
 * ```json { "name": "Factory designs", "scope": "personal", "source": "factory_portal" } ```
 *
 * Accepted sources are `zds` and `factory_portal`. Omitting source defaults to `zds`. Null and unsupported values return HTTP 400.
 *
 * Source is returned in library responses and cannot be changed after creation. Clients use it to decide how to display libraries; it does not change API permissions. No API source filter is provided at the moment.
 *
 * Tags: projects
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {CreateProjectLibraryRequest} body Request body payload
 * @returns {Promise<CreateProjectLibraryReturn>} successful creation
 *
 * Possible return types: ProjectLibraryResponse
 */
export default async function create_project_library({
  client,
  body,
}: CreateProjectLibraryInput): Promise<CreateProjectLibraryReturn> {
  const path = `/user/project-libraries`
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
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as CreateProjectLibraryReturn
  return result
}
