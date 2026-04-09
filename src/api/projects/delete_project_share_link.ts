import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { Uuid } from '../../models.js'

interface DeleteProjectShareLinkInput {
  client?: Client
  id: Uuid
  key: string
}

type DeleteProjectShareLinkReturn = void

/**
 * Delete one share link for one of the authenticated user's projects.
 *
 * Tags: projects
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id Project identifier. (path)
 * @property {string} key Share-link key. (path)
 * @returns {Promise<DeleteProjectShareLinkReturn>} resource updated
 */
export default async function delete_project_share_link({
  client,
  id,
  key,
}: DeleteProjectShareLinkInput): Promise<DeleteProjectShareLinkReturn> {
  const path = `/user/projects/${id}/share-links/${key}`
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
  return undefined as DeleteProjectShareLinkReturn
}
