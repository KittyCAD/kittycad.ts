import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'
import { Pager, createPager } from '../../pagination.js'

import {
  ProjectSummaryResponseResultsPage,
  ProjectAccessScope,
  ProjectSummaryResponse,
} from '../../models.js'

interface ListProjectsInput {
  client?: Client
  limit?: number
  page_token?: string
  scope?: ProjectAccessScope
  unassigned?: boolean
}

type ListProjectsReturn = ProjectSummaryResponseResultsPage

/**
 * List the authenticated user's projects.
 *
 * Returns a page, including personal projects and projects accessible through the request's active organization. Optional `scope=personal` or `scope=organization` narrows ownership; `unassigned=true` includes only projects whose `library_id` is null. Combine them, for example: `GET /user/projects?scope=personal&unassigned=true`. Omitting both filters keeps returning all accessible projects, including projects in named libraries.
 *
 * Unassigned is a grouping within the existing ownership scope, not a stored default library. Use `GET /user/project-libraries/{id}/projects` for a named library's paginated project list. Filters do not grant additional access.
 *
 * Tags: projects
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {number} limit Maximum number of items returned by a single call (query)
 * @property {string} page_token Token returned by previous call to retrieve the subsequent page (query)
 * @property {ProjectAccessScope} scope Restrict results to personal projects or the active organization's projects. When omitted, include all accessible projects. (query)
 * @property {boolean} unassigned Return only projects that have no named library assigned. (query)
 * @returns {Promise<ListProjectsReturn>} successful operation
 *
 * Possible return types: ProjectSummaryResponseResultsPage
 */
export default async function list_projects({
  client,
  limit,
  page_token,
  scope,
  unassigned,
}: ListProjectsInput): Promise<ListProjectsReturn> {
  const path = `/user/projects`
  const qs = buildQuery({
    limit: limit,
    page_token: page_token,
    scope: scope,
    unassigned: unassigned,
  })
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
  const result = (await response.json()) as ListProjectsReturn
  return result
}

export function list_projects_pager(
  params: ListProjectsInput
): Pager<ListProjectsInput, ListProjectsReturn, ProjectSummaryResponse> {
  return createPager<
    ListProjectsInput,
    ListProjectsReturn,
    ProjectSummaryResponse
  >(list_projects, params, 'page_token')
}
