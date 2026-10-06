import { File } from '../../models.js'
import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { CreateProjectVersionResponse, Uuid } from '../../models.js'

interface CreateProjectVersionInput {
  client?: Client
  files: File[]
  id: Uuid
}

type CreateProjectVersionReturn = CreateProjectVersionResponse

/**
 * Save an alternate project version without changing the current version.
 *
 * For a history A -> B -> C with C current, saving D with B as its parent creates a second child of B. C stays current. Publications and share links keep pointing to their existing versions.
 *
 * Send a multipart request with a JSON `body` part and file parts. Upload the complete replacement snapshot, including unchanged files. Each uploaded filename must be its relative project path.
 *
 * Example JSON for the `body` part (replace the parent placeholder with B's UUID):
 *
 * ```json {   "parent_version_id": "<B_VERSION_ID>",   "title": "Alternative design",   "description": "Trying another shape",   "entrypoint_path": "main.kcl",   "deleted_paths": ["obsolete.kcl"] } ```
 *
 * `parent_version_id` and `title` are required. Description defaults to an empty string, and the entrypoint defaults to `main.kcl`. When supplying `deleted_paths`, list all files removed from the chosen parent B, regardless of the files in current C. An empty list declares that no files were removed; omitting the field skips this deletion-intent check.
 *
 * Save the JSON as `save-metadata.json`. With D's files in the working directory, set `API_BASE_URL`, `API_TOKEN`, and `PROJECT_ID`, then generate `SAVE_KEY` once for this save (for example, using `uuidgen`):
 *
 * ```sh curl --fail-with-body \   --request POST "${API_BASE_URL}/user/projects/${PROJECT_ID}/versions" \   --header "Authorization: Bearer ${API_TOKEN}" \   --header "Idempotency-Key: ${SAVE_KEY}" \   --form 'body=<save-metadata.json;type=application/json' \   --form 'file-0=@project.toml;filename=project.toml' \   --form 'file-1=@main.kcl;filename=main.kcl' \   --form 'file-2=@part.kcl;filename=part.kcl' ```
 *
 * The HTTP 200 response contains `version_id` (D) and `current_version_id` (C, or the current version when the response is prepared). Read D through `GET /user/projects/{id}/versions/{version_id}` and download it through `GET /user/projects/{id}/versions/{version_id}/download`. Downloads default to TAR; use `?format=zip` for ZIP.
 *
 * `Idempotency-Key` is optional for all clients. Use a unique key for each save to avoid duplicate versions when retrying. Retain the key, metadata, and submitted file contents across app restarts until the save's outcome is known. Within 24 hours of a successful save, retrying with the same key and contents returns the same version. Changed contents require a new key; reusing an unexpired key with different contents returns HTTP 409 with `IdempotencyConflict`. Without a key, or after its window expires, resending the request can create another version.
 *
 * Write access to the project is required, including for retries. A public listing or share link does not grant access to private version history. There is no endpoint to promote an existing alternate version directly to current.
 *
 * Tags: projects
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The identifier. (path)
 * @property {File[]} files Files attached as multipart/form-data.
 * @returns {Promise<CreateProjectVersionReturn>} successful operation
 *
 * Possible return types: CreateProjectVersionResponse
 */
export default async function create_project_version({
  client,
  files,
  id,
}: CreateProjectVersionInput): Promise<CreateProjectVersionReturn> {
  const path = `/user/projects/${id}/versions`
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
  const result = (await response.json()) as CreateProjectVersionReturn
  return result
}
