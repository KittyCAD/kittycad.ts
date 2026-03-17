import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { UserResponse, UserIdentifier } from '../../models.js'

interface GetUserInput {
  client?: Client
  id: UserIdentifier
}

type GetUserReturn = UserResponse

/**
 * Get a user.
 *
 * To get information about yourself, use `/users/me` as the endpoint. By doing so you will get the user information for the authenticated user.
 *
 * Alternatively, to get information about the authenticated user, use `/user` endpoint.
 *
 * Tags: users, hidden
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {UserIdentifier} id The user's identifier (uuid or email). (path)
 * @returns {Promise<GetUserReturn>} successful operation
 *
 * Possible return types: UserResponse
 */
export default async function get_user({
  client,
  id,
}: GetUserInput): Promise<GetUserReturn> {
  const path = `/users/${id}`
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
  const fetchOptions: RequestInit = {
    method: 'GET',
    headers,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as GetUserReturn
  return result
}
