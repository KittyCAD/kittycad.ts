import { Client } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {
  ApiCallWithPriceResultsPage,
  UserIdentifier,
  CreatedAtSortMode,
} from '../../models.js'

interface ListApiCallsForUserInput {
  client?: Client
  id: UserIdentifier
  limit: number
  page_token: string
  sort_by: CreatedAtSortMode
}

type ListApiCallsForUserReturn = ApiCallWithPriceResultsPage

/**
 * List API calls for a user.
 *
 * This endpoint requires authentication by any Zoo user. It returns the API calls for the authenticated user if "me" is passed as the user id.
 *
 * Alternatively, you can use the `/user/api-calls` endpoint to get the API calls for your user.
 *
 * If the authenticated user is a Zoo employee, then the API calls are returned for the user specified by the user id.
 *
 * The API calls are returned in order of creation, with the most recently created API calls first.
 *
 * Tags: api-calls, hidden
 *
 * @param client Optional client with auth token.
 * @param id The user's identifier (uuid or email). (path)
 * @param limit Maximum number of items returned by a single call (query)
 * @param page_token Token returned by previous call to retrieve the subsequent page (query)
 * @param sort_by (query)
 * @returns successful operation
 */
export default async function list_api_calls_for_user({
  client,
  id,
  limit,
  page_token,
  sort_by,
}: ListApiCallsForUserInput): Promise<ListApiCallsForUserReturn> {
  const url = `/users/${id}/api-calls?limit=${limit}&page_token=${page_token}&sort_by=${sort_by}`
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
  const result = (await response.json()) as ListApiCallsForUserReturn
  return result
}
