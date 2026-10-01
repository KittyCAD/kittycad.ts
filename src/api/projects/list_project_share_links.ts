import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { collectApiList } from '../../pagination.js'

import { ProjectShareLinkResponse, Uuid } from '../../models.js'

interface ListProjectShareLinksInput {
  client?: Client
  id: Uuid
  signal?: AbortSignal
}

type ListProjectShareLinksReturn = ProjectShareLinkResponse[]

/**
 * List share links for one of the authenticated user's projects.
 *
 * Accepts legacy collections or items/next_page responses and reads all pages.
 * Rejects failed, malformed, or repeated pages without returning partial results.
 *
 * Tags: projects
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {AbortSignal} [signal] Cancel the entire list request.
 * @property {Uuid} id The identifier. (path)
 * @returns {Promise<ListProjectShareLinksReturn>} successful operation
 *
 * Possible return types: ProjectShareLinkResponse[]
 */
export default async function list_project_share_links({
  client,
  id,
  signal,
}: ListProjectShareLinksInput): Promise<ListProjectShareLinksReturn> {
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
    signal,
  }
  const _fetch = client?.fetch || fetch
  const items = await collectApiList<ListProjectShareLinksReturn[number]>(
    fullUrl,
    async (pageUrl) => {
      const response = await _fetch(pageUrl, fetchOptions)
      await throwIfNotOk(response)
      return response.json()
    }
  )
  return items
}
