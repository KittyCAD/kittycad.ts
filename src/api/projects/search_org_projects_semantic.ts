import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {
  ProjectSemanticSearchMatch,
  ProjectSemanticSearchRequest,
} from '../../models.js'

interface SearchOrgProjectsSemanticInput {
  client?: Client
  body: ProjectSemanticSearchRequest
}

type SearchOrgProjectsSemanticReturn = ProjectSemanticSearchMatch[]

/**
 * Search current projects shared with the authenticated user's organization.
 *
 * Results are ranked by similarity to bounded project metadata: title, description, and a capped list of source filenames. Project source contents are not indexed. Projects become searchable asynchronously after saving or changing organization ownership. Personal projects and obsolete versions are excluded. Pass `library_id` to search one named organization library.
 *
 * Tags: projects
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {ProjectSemanticSearchRequest} body Request body payload
 * @returns {Promise<SearchOrgProjectsSemanticReturn>} successful operation
 *
 * Possible return types: ProjectSemanticSearchMatch[]
 */
export default async function search_org_projects_semantic({
  client,
  body,
}: SearchOrgProjectsSemanticInput): Promise<SearchOrgProjectsSemanticReturn> {
  const path = `/org/projects/search/semantic`
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
  headers['Content-Type'] = 'application/json'
  const fetchOptions: RequestInit = {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as SearchOrgProjectsSemanticReturn
  return result
}
