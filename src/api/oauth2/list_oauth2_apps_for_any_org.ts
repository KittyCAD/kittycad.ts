import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'
import { Pager, createPager } from '../../pagination.js'

import {
  OAuth2AppResponseResultsPage,
  Uuid,
  CreatedAtSortMode,
  OAuth2AppResponse,
} from '../../models.js'

interface ListOauth2AppsForAnyOrgInput {
  client?: Client
  id: Uuid
  limit?: number
  page_token?: string
  sort_by?: CreatedAtSortMode
}

type ListOauth2AppsForAnyOrgReturn = OAuth2AppResponseResultsPage

/**
 * List OAuth 2.0 apps owned by an organization.
 *
 * This endpoint requires Zoo admin authentication. It returns the target organization's active OAuth apps for admin dashboard inspection.
 *
 * Tags: oauth2, hidden
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The organization ID. (path)
 * @property {number} limit Maximum number of items returned by a single call (query)
 * @property {string} page_token Token returned by previous call to retrieve the subsequent page (query)
 * @property {CreatedAtSortMode} sort_by (query)
 * @returns {Promise<ListOauth2AppsForAnyOrgReturn>} successful operation
 *
 * Possible return types: OAuth2AppResponseResultsPage
 */
export default async function list_oauth2_apps_for_any_org({
  client,
  id,
  limit,
  page_token,
  sort_by,
}: ListOauth2AppsForAnyOrgInput): Promise<ListOauth2AppsForAnyOrgReturn> {
  const path = `/orgs/${id}/oauth2/apps`
  const qs = buildQuery({
    limit: limit,
    page_token: page_token,
    sort_by: sort_by,
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
  const result = (await response.json()) as ListOauth2AppsForAnyOrgReturn
  return result
}

export function list_oauth2_apps_for_any_org_pager(
  params: ListOauth2AppsForAnyOrgInput
): Pager<
  ListOauth2AppsForAnyOrgInput,
  ListOauth2AppsForAnyOrgReturn,
  OAuth2AppResponse
> {
  return createPager<
    ListOauth2AppsForAnyOrgInput,
    ListOauth2AppsForAnyOrgReturn,
    OAuth2AppResponse
  >(list_oauth2_apps_for_any_org, params, 'page_token')
}
