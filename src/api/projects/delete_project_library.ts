import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { Uuid } from '../../models.js'

interface DeleteProjectLibraryInput {
  client?: Client
  id: Uuid
  expected_revision: string
}

type DeleteProjectLibraryReturn = void

/**
 * Delete an empty cloud project library.
 *
 * Supply the library's last-read `revision` as the required `expected_revision` query parameter. URL-encode this value. Only the personal owner or an admin of the active organization can delete the library. Libraries managed by an organization dataset cannot be deleted independently; those requests return HTTP 409.
 *
 * Move or unassign all projects first. A nonempty library or stale revision returns HTTP 409. Success returns HTTP 204 without deleting projects or history. Library revisions are separate from project `revision` and `metadata_revision`.
 *
 * Tags: projects
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The identifier. (path)
 * @property {string} expected_revision Revision returned by the last library read. (query)
 * @returns {Promise<DeleteProjectLibraryReturn>} successful deletion
 */
export default async function delete_project_library({
  client,
  id,
  expected_revision,
}: DeleteProjectLibraryInput): Promise<DeleteProjectLibraryReturn> {
  const path = `/user/project-libraries/${id}`
  const qs = buildQuery({ expected_revision: expected_revision })
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
    method: 'DELETE',
    headers,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  return undefined as DeleteProjectLibraryReturn
}
