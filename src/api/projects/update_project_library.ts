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
 * Read the project first, then send JSON using its `metadata_revision` as the required `expected_revision`. Do not use its content `revision` or a library's revision for this operation.
 *
 * ```json { "library_id": "<DESTINATION_LIBRARY_ID>", "expected_revision": "<METADATA_REVISION>" } ```
 *
 * Save the JSON as `move-project.json`, with values from actual responses:
 *
 * ```sh curl --fail-with-body \   --request PUT "${API_BASE_URL}/user/projects/${PROJECT_ID}/library" \   --header "Authorization: Bearer ${API_TOKEN}" \   --header 'Content-Type: application/json' \   --data-binary @move-project.json ```
 *
 * Use `library_id: null` to unassign the project. The destination must match the project's current ownership: the same user for a personal project, or the same organization for an organization project. Existing project write permission is required; managing the destination library does not grant it. To change ownership first, use `/user/projects/{id}/organization`.
 *
 * HTTP 200 returns the project with its library assignment and a new `metadata_revision`. A move preserves its ID, files, current content `revision`, version history, publication, and share links; it creates no content version. Ordinary saves preserve membership and cannot be used to move a project.
 *
 * A stale revision or a destination with different ownership returns HTTP 409. If another save, move, or ownership change conflicts with the move, fetch the latest project before deciding whether to retry. Missing or inaccessible projects/libraries fail their normal existence and permission checks.
 *
 * If the connection drops or the request times out, the API may have completed the move even though the client did not receive a response. Fetch the project to check its current library. If library_id matches the requested destination, no further move is needed. Otherwise review its latest state before retrying with its new `metadata_revision`. No idempotency key is used for this operation.
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
