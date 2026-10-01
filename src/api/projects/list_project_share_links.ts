import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'
import { Pager, createPager } from '../../pagination.js'

import {
  ProjectShareLinkResponseResultsPage,
  Uuid,
  ProjectShareLinkResponse,
} from '../../models.js'

interface ListProjectShareLinksInput {
  client?: Client
  id: Uuid
  limit?: number
  page_token?: string
}

type ListProjectShareLinksReturn = ProjectShareLinkResponseResultsPage

/**
 * List share links for one of the authenticated user's projects.
 *
 * Tags: projects
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The identifier. (path)
 * @property {number} limit Maximum number of items returned by a single call (query)
 * @property {string} page_token Token returned by previous call to retrieve the subsequent page (query)
 * @returns {Promise<ListProjectShareLinksReturn>} successful operation
 *
 * Possible return types: ProjectShareLinkResponseResultsPage
 */
export default async function list_project_share_links({
  client,
  id,
  limit,
  page_token,
}: ListProjectShareLinksInput): Promise<ListProjectShareLinksReturn> {
  const path = `/user/projects/${id}/share-links`
  const qs = buildQuery({ limit: limit, page_token: page_token })
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
  const result = (await response.json()) as ListProjectShareLinksReturn
  return result
}

export function list_project_share_links_pager(
  params: ListProjectShareLinksInput
): Pager<
  ListProjectShareLinksInput,
  ListProjectShareLinksReturn,
  ProjectShareLinkResponse
> {
  return createPager<
    ListProjectShareLinksInput,
    ListProjectShareLinksReturn,
    ProjectShareLinkResponse
  >(list_project_share_links, params, 'page_token')
}
