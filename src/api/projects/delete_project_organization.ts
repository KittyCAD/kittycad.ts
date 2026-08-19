import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { Uuid } from '../../models.js'

interface DeleteProjectOrganizationInput {
  client?: Client
  id: Uuid
}

type DeleteProjectOrganizationReturn = void

/**
 * Move an organization project back to its creator's personal library.
 *
 * Organization administrators may perform this move to revoke organization access. The project ID, current revision, files, and version history remain unchanged.
 *
 * Tags: projects
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The identifier. (path)
 * @returns {Promise<DeleteProjectOrganizationReturn>} successful deletion
 */
export default async function delete_project_organization({
  client,
  id,
}: DeleteProjectOrganizationInput): Promise<DeleteProjectOrganizationReturn> {
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
    method: 'DELETE',
    headers,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  return undefined as DeleteProjectOrganizationReturn
}
