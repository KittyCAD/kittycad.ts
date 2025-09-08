import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'
import { Pager, createPager } from '../../pagination.js'

import {
  ApiTokenResultsPage,
  CreatedAtSortMode,
  ApiToken,
} from '../../models.js'

interface ListApiTokensForUserInput {
  client?: Client
  limit?: number
  page_token?: string
  sort_by?: CreatedAtSortMode
}

type ListApiTokensForUserReturn = ApiTokenResultsPage

/**
 * List API tokens for your user.
 *
 * This endpoint requires authentication by any Zoo user. It returns the API tokens for the authenticated user.
 *
 * The API tokens are returned in order of creation, with the most recently created API tokens first.
 *
 * Tags: api-tokens
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {number} limit Maximum number of items returned by a single call (query)
 * @property {string} page_token Token returned by previous call to retrieve the subsequent page (query)
 * @property {CreatedAtSortMode} sort_by (query)
 * @returns {Promise<ListApiTokensForUserReturn>} successful operation
 *
 * Possible return types: ApiTokenResultsPage
 */
export default async function list_api_tokens_for_user({
  client,
  limit,
  page_token,
  sort_by,
}: ListApiTokensForUserInput): Promise<ListApiTokensForUserReturn> {
  const path = `/user/api-tokens`
  const qs = buildQuery({
    limit: limit,
    page_token: page_token,
    sort_by: sort_by,
  })
  const url = path + qs
  // Backwards compatible for the BASE_URL env variable
  // That used to exist in only this lib, ZOO_HOST exists in the all the other
  // sdks and the CLI.
  const urlBase =
    client?.baseUrl ||
    process?.env?.ZOO_HOST ||
    process?.env?.BASE_URL ||
    'https://api.zoo.dev'
  const fullUrl = urlBase + url
  // The other sdks use to use KITTYCAD_API_TOKEN, now they still do for
  // backwards compatibility, but the new standard is ZOO_API_TOKEN.
  // For some reason only this lib supported KITTYCAD_TOKEN, so we need to
  // check for that as well.
  const kittycadToken = client
    ? client.token || process.env.ZOO_API_TOKEN || ''
    : process.env.KITTYCAD_TOKEN ||
      process.env.KITTYCAD_API_TOKEN ||
      process.env.ZOO_API_TOKEN ||
      ''
  const headers: Record<string, string> = {}
  if (kittycadToken) headers.Authorization = `Bearer ${kittycadToken}`
  const fetchOptions: RequestInit = {
    method: 'GET',
    headers,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as ListApiTokensForUserReturn
  return result
}

export function list_api_tokens_for_user_pager(
  params: ListApiTokensForUserInput
): Pager<ListApiTokensForUserInput, ListApiTokensForUserReturn, ApiToken> {
  return createPager<
    ListApiTokensForUserInput,
    ListApiTokensForUserReturn,
    ApiToken
  >(list_api_tokens_for_user, params, 'page_token')
}
