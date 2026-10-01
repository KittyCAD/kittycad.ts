import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'
import { Pager, createPager } from '../../pagination.js'

import {
  PublicProjectResponseResultsPage,
  PublicProjectResponse,
} from '../../models.js'

interface ListPublicProjectsInput {
  client?: Client
  limit?: number
  page_token?: string
}

type ListPublicProjectsReturn = PublicProjectResponseResultsPage

/**
 * List publicly visible community projects for the website/gallery.
 *
 * Tags: projects
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {number} limit Maximum number of items returned by a single call (query)
 * @property {string} page_token Token returned by previous call to retrieve the subsequent page (query)
 * @returns {Promise<ListPublicProjectsReturn>} successful operation
 *
 * Possible return types: PublicProjectResponseResultsPage
 */
export default async function list_public_projects({
  client,
  limit,
  page_token,
}: ListPublicProjectsInput): Promise<ListPublicProjectsReturn> {
  const path = `/projects/public`
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
  const result = (await response.json()) as ListPublicProjectsReturn
  return result
}

export function list_public_projects_pager(
  params: ListPublicProjectsInput
): Pager<
  ListPublicProjectsInput,
  ListPublicProjectsReturn,
  PublicProjectResponse
> {
  return createPager<
    ListPublicProjectsInput,
    ListPublicProjectsReturn,
    PublicProjectResponse
  >(list_public_projects, params, 'page_token')
}
