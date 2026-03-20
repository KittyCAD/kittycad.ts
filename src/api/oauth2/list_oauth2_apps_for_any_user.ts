import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'
import { Pager, createPager } from '../../pagination.js'

import {
  OAuth2AppResponseResultsPage,
  UserIdentifier,
  CreatedAtSortMode,
  OAuth2AppResponse,
} from '../../models.js'

interface ListOauth2AppsForAnyUserInput {
  client?: Client
  id: UserIdentifier
  limit?: number
  page_token?: string
  sort_by?: CreatedAtSortMode
}

type ListOauth2AppsForAnyUserReturn = OAuth2AppResponseResultsPage

/**
 * List OAuth 2.0 apps owned by a user.
 *
 * This endpoint requires Zoo admin authentication. It returns the target user's active OAuth apps so the admin dashboard can inspect them without impersonating the user.
 *
 * Tags: oauth2, hidden
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {UserIdentifier} id The user's identifier (uuid or email). (path)
 * @property {number} limit Maximum number of items returned by a single call (query)
 * @property {string} page_token Token returned by previous call to retrieve the subsequent page (query)
 * @property {CreatedAtSortMode} sort_by (query)
 * @returns {Promise<ListOauth2AppsForAnyUserReturn>} successful operation
 *
 * Possible return types: OAuth2AppResponseResultsPage
 */
export default async function list_oauth2_apps_for_any_user({
  client,
  id,
  limit,
  page_token,
  sort_by,
}: ListOauth2AppsForAnyUserInput): Promise<ListOauth2AppsForAnyUserReturn> {
  const path = `/users/${id}/oauth2/apps`
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
  const result = (await response.json()) as ListOauth2AppsForAnyUserReturn
  return result
}

export function list_oauth2_apps_for_any_user_pager(
  params: ListOauth2AppsForAnyUserInput
): Pager<
  ListOauth2AppsForAnyUserInput,
  ListOauth2AppsForAnyUserReturn,
  OAuth2AppResponse
> {
  return createPager<
    ListOauth2AppsForAnyUserInput,
    ListOauth2AppsForAnyUserReturn,
    OAuth2AppResponse
  >(list_oauth2_apps_for_any_user, params, 'page_token')
}
