import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'
import { Pager, createPager } from '../../pagination.js'

import {
  ProjectVersionSummaryResponseResultsPage,
  Uuid,
  ProjectVersionSummaryResponse,
} from '../../models.js'

interface ListProjectVersionsInput {
  client?: Client
  id: Uuid
  limit?: number
  page_token?: string
}

type ListProjectVersionsReturn = ProjectVersionSummaryResponseResultsPage

/**
 * List a project's saved versions, newest first.
 *
 * Requires access to the project. Public visibility or link sharing will not grant access to history.
 *
 * Tags: projects
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The identifier. (path)
 * @property {number} limit Maximum number of items returned by a single call (query)
 * @property {string} page_token Token returned by previous call to retrieve the subsequent page (query)
 * @returns {Promise<ListProjectVersionsReturn>} successful operation
 *
 * Possible return types: ProjectVersionSummaryResponseResultsPage
 */
export default async function list_project_versions({
  client,
  id,
  limit,
  page_token,
}: ListProjectVersionsInput): Promise<ListProjectVersionsReturn> {
  const path = `/user/projects/${id}/versions`
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
  const result = (await response.json()) as ListProjectVersionsReturn
  return result
}

export function list_project_versions_pager(
  params: ListProjectVersionsInput
): Pager<
  ListProjectVersionsInput,
  ListProjectVersionsReturn,
  ProjectVersionSummaryResponse
> {
  return createPager<
    ListProjectVersionsInput,
    ListProjectVersionsReturn,
    ProjectVersionSummaryResponse
  >(list_project_versions, params, 'page_token')
}
