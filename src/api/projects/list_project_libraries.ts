import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'
import { Pager, createPager } from '../../pagination.js'

import {
  ProjectLibraryResponseResultsPage,
  ProjectLibraryResponse,
} from '../../models.js'

interface ListProjectLibrariesInput {
  client?: Client
  limit?: number
  page_token?: string
}

type ListProjectLibrariesReturn = ProjectLibraryResponseResultsPage

/**
 * List personal libraries and libraries belonging to the active organization.
 *
 * Returns an object with `items` and `next_page`, ordered by library ID. Request the next page with `?page_token=<next_page>` until `next_page` is null. Keep the same authenticated user and active organization for every page; changing that context requires starting a new list request.
 *
 * Each library has a stable `id`, a display `name`, either `user_id` or `org_id`, an opaque `revision`, and `can_manage`. Use the ID to track a library across renames. `can_manage` allows renaming/deleting the library, not editing all of its projects. Organization members can discover libraries; only organization admins can manage them. Project permissions remain unchanged.
 *
 * Projects with `library_id: null` have no named library. They do not appear as a library record here. Use `GET /user/projects?scope=personal&unassigned=true` for the default personal group, or `scope=organization&unassigned=true` for the active organization's unassigned projects.
 *
 * Each library includes its creation source: `zds`, `factory_portal`, or `org_dataset`. Libraries created before source tracking are returned as `zds`. Clients can filter the results by source; API permissions remain unchanged.
 *
 * Tags: projects
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {number} limit Maximum number of items returned by a single call (query)
 * @property {string} page_token Token returned by previous call to retrieve the subsequent page (query)
 * @returns {Promise<ListProjectLibrariesReturn>} successful operation
 *
 * Possible return types: ProjectLibraryResponseResultsPage
 */
export default async function list_project_libraries({
  client,
  limit,
  page_token,
}: ListProjectLibrariesInput): Promise<ListProjectLibrariesReturn> {
  const path = `/user/project-libraries`
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
  const result = (await response.json()) as ListProjectLibrariesReturn
  return result
}

export function list_project_libraries_pager(
  params: ListProjectLibrariesInput
): Pager<
  ListProjectLibrariesInput,
  ListProjectLibrariesReturn,
  ProjectLibraryResponse
> {
  return createPager<
    ListProjectLibrariesInput,
    ListProjectLibrariesReturn,
    ProjectLibraryResponse
  >(list_project_libraries, params, 'page_token')
}
