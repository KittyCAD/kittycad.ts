import { Client } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'
import { Pager, createPager } from '../../pagination.js'

import {
  ExtendedUserResultsPage,
  CreatedAtSortMode,
  ExtendedUser,
} from '../../models.js'

interface ListUsersExtendedInput {
  client?: Client
  limit: number
  page_token: string
  sort_by: CreatedAtSortMode
}

type ListUsersExtendedReturn = ExtendedUserResultsPage

/**
 * List users with extended information.
 *
 * This endpoint requires authentication by a Zoo employee. The users are returned in order of creation, with the most recently created users first.
 *
 * Tags: users, hidden
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {number} limit Maximum number of items returned by a single call (query)
 * @property {string} page_token Token returned by previous call to retrieve the subsequent page (query)
 * @property {CreatedAtSortMode} sort_by (query)
 * @returns {Promise<ListUsersExtendedReturn>} successful operation
 *
 * Possible return types: ExtendedUserResultsPage
 */
export default async function list_users_extended({
  client,
  limit,
  page_token,
  sort_by,
}: ListUsersExtendedInput): Promise<ListUsersExtendedReturn> {
  const url = `/users-extended?limit=${limit}&page_token=${page_token}&sort_by=${sort_by}`
  // Backwards compatible for the BASE_URL env variable
  // That used to exist in only this lib, ZOO_HOST exists in the all the other
  // sdks and the CLI.
  const urlBase =
    process?.env?.ZOO_HOST || process?.env?.BASE_URL || 'https://api.zoo.dev'
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
  const response = await fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as ListUsersExtendedReturn
  return result
}

export function list_users_extendedPager(
  params: ListUsersExtendedInput
): Pager<ListUsersExtendedInput, ListUsersExtendedReturn, ExtendedUser> {
  return createPager<
    ListUsersExtendedInput,
    ListUsersExtendedReturn,
    ExtendedUser
  >(list_users_extended, params, 'page_token')
}
