import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'
import { Pager, createPager } from '../../pagination.js'

import {
  OAuth2AppResponseResultsPage,
  CreatedAtSortMode,
  OAuth2AppResponse,
} from '../../models.js'

interface ListUserOauth2AppsInput {
  client?: Client
  limit?: number
  page_token?: string
  sort_by?: CreatedAtSortMode
}

type ListUserOauth2AppsReturn = OAuth2AppResponseResultsPage

/**
 * List personal OAuth apps.
 *
 * This endpoint requires authentication by any Zoo user. It lists the authenticated user's active public OAuth apps.
 *
 * Tags: oauth2, users
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {number} limit Maximum number of items returned by a single call (query)
 * @property {string} page_token Token returned by previous call to retrieve the subsequent page (query)
 * @property {CreatedAtSortMode} sort_by (query)
 * @returns {Promise<ListUserOauth2AppsReturn>} successful operation
 *
 * Possible return types: OAuth2AppResponseResultsPage
 */
export default async function list_user_oauth2_apps({
  client,
  limit,
  page_token,
  sort_by,
}: ListUserOauth2AppsInput): Promise<ListUserOauth2AppsReturn> {
  const path = `/user/oauth2/apps`
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
  const result = (await response.json()) as ListUserOauth2AppsReturn
  return result
}

export function list_user_oauth2_apps_pager(
  params: ListUserOauth2AppsInput
): Pager<ListUserOauth2AppsInput, ListUserOauth2AppsReturn, OAuth2AppResponse> {
  return createPager<
    ListUserOauth2AppsInput,
    ListUserOauth2AppsReturn,
    OAuth2AppResponse
  >(list_user_oauth2_apps, params, 'page_token')
}
