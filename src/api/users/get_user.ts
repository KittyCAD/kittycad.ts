import { Client } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { User, UserIdentifier } from '../../models.js'

interface GetUserInput {
  client?: Client
  id: UserIdentifier
}

type GetUserReturn = User

/**
 * Get a user.
 *
 * To get information about yourself, use `/users/me` as the endpoint. By doing so you will get the user information for the authenticated user.
 *
 * Alternatively, to get information about the authenticated user, use `/user` endpoint.
 *
 * Tags: users, hidden
 *
 * @param client Optional client with auth token.
 * @param id The user's identifier (uuid or email). (path)
 * @returns successful operation
 */
export default async function get_user({
  client,
  id,
}: GetUserInput): Promise<GetUserReturn> {
  const url = `/users/${id}`
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
  const result = (await response.json()) as GetUserReturn
  return result
}
