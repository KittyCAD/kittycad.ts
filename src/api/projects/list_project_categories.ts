import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'
import { Pager, createPager } from '../../pagination.js'

import {
  ProjectCategoryResponseResultsPage,
  ProjectCategoryResponse,
} from '../../models.js'

interface ListProjectCategoriesInput {
  client?: Client
  limit?: number
  page_token?: string
}

type ListProjectCategoriesReturn = ProjectCategoryResponseResultsPage

/**
 * List the active categories available for project submissions.
 *
 * Tags: projects
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {number} limit Maximum number of items returned by a single call (query)
 * @property {string} page_token Token returned by previous call to retrieve the subsequent page (query)
 * @returns {Promise<ListProjectCategoriesReturn>} successful operation
 *
 * Possible return types: ProjectCategoryResponseResultsPage
 */
export default async function list_project_categories({
  client,
  limit,
  page_token,
}: ListProjectCategoriesInput): Promise<ListProjectCategoriesReturn> {
  const path = `/projects/categories`
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
  const result = (await response.json()) as ListProjectCategoriesReturn
  return result
}

export function list_project_categories_pager(
  params: ListProjectCategoriesInput
): Pager<
  ListProjectCategoriesInput,
  ListProjectCategoriesReturn,
  ProjectCategoryResponse
> {
  return createPager<
    ListProjectCategoriesInput,
    ListProjectCategoriesReturn,
    ProjectCategoryResponse
  >(list_project_categories, params, 'page_token')
}
