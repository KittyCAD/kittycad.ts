import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { ProjectShareLinkResponse, Uuid } from '../../models.js'

interface ListUserProjectShareLinksInput {
  client?: Client
  id: Uuid
}

type ListUserProjectShareLinksReturn = ProjectShareLinkResponse[]

/**
 * List share links for one of the authenticated user's projects.
 *
 * Tags: users
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The identifier. (path)
 * @returns {Promise<ListUserProjectShareLinksReturn>} successful operation
 *
 * Possible return types: ProjectShareLinkResponse[]
 */
export default async function list_user_project_share_links({
  client,
  id,
}: ListUserProjectShareLinksInput): Promise<ListUserProjectShareLinksReturn> {
  const path = `/user/projects/${id}/share-links`
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
    method: 'GET',
    headers,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as ListUserProjectShareLinksReturn
  return result
}
