import { File } from '../../models.js'
import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { ProjectResponse } from '../../models.js'

interface CreateProjectInput {
  client?: Client
  files: File[]
}

type CreateProjectReturn = ProjectResponse

/**
 * Create a project for the authenticated user.
 *
 * Send multipart data with a JSON `body` part and file parts whose filenames are relative project paths. Include an optional `library_id` in the JSON to create the project in a named library:
 *
 * ```json { "title": "Bracket", "entrypoint_path": "main.kcl", "library_id": "<LIBRARY_ID>" } ```
 *
 * A personal library creates a personal project. An accessible library belonging to the active organization creates an organization project with the caller as its creator; creating the project does not require library-management rights. Omitting `library_id` or passing null creates an unassigned personal project, even when the request has an active organization.
 *
 * The HTTP 201 response includes `id`, `library_id`, content `revision`, and `metadata_revision`. Later saves preserve membership, even if they include a library field. Use `PUT /user/projects/{id}/library` to move or unassign an existing project instead of uploading its files again.
 *
 * Tags: projects
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {File[]} files Files attached as multipart/form-data.
 * @returns {Promise<CreateProjectReturn>} successful creation
 *
 * Possible return types: ProjectResponse
 */
export default async function create_project({
  client,
  files,
}: CreateProjectInput): Promise<CreateProjectReturn> {
  const path = `/user/projects`
  const qs = buildQuery({})
  const url = path + qs
  // Backwards compatible for the BASE_URL env variable
  // That used to exist in only this lib, ZOO_HOST exists in the all the other
  // sdks and the CLI.
  const urlBase = client?.baseUrl || 'https://api.zoo.dev'
  const fullUrl = urlBase + url
  // The other sdks use to use KITTYCAD_API_TOKEN, now they still do for
  // backwards compatibility, but the new standard is ZOO_API_TOKEN.
  // For some reason only this lib supported KITTYCAD_TOKEN, so we need to
  // check for that as well.
  const kittycadToken = client ? client.token || '' : ''
  const headers: Record<string, string> = {}
  if (kittycadToken) headers.Authorization = `Bearer ${kittycadToken}`

  const formData = new FormData()
  files.forEach((file) => {
    formData.append(file.name, file.data, file.name)
  })

  const fetchOptions: RequestInit = {
    method: 'POST',
    headers,
    body: formData,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as CreateProjectReturn
  return result
}
