import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { ProjectSummaryResponse, ProjectAccessScope } from '../../models.js'

interface ListProjectsInput {
  client?: Client
  scope?: ProjectAccessScope
  unassigned?: boolean
}

type ListProjectsReturn = ProjectSummaryResponse[]

/**
 * List the authenticated user's projects.
 *
 * Tags: projects
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {ProjectAccessScope} scope Restrict results to personal projects or the active organization's projects. When omitted, include all accessible projects. (query)
 * @property {boolean} unassigned Return only projects that have no named library assigned. (query)
 * @returns {Promise<ListProjectsReturn>} successful operation
 *
 * Possible return types: ProjectSummaryResponse[]
 */
export default async function list_projects({
  client,
  scope,
  unassigned,
}: ListProjectsInput): Promise<ListProjectsReturn> {
  const path = `/user/projects`
  const qs = buildQuery({ scope: scope, unassigned: unassigned })
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
