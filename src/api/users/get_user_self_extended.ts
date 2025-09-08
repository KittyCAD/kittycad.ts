import { Client } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { ExtendedUser } from '../../models.js'

interface GetUserSelfExtendedInput {
  client?: Client
}

type GetUserSelfExtendedReturn = ExtendedUser

/**
 * Get extended information about your user.
 *
 * Get the user information for the authenticated user.
 *
 * Alternatively, you can also use the `/users-extended/me` endpoint.
 *
 * Tags: users
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @returns {Promise<GetUserSelfExtendedReturn>} successful operation
 *
 * Possible return types: ExtendedUser
 */
export default async function get_user_self_extended(
  { client }: GetUserSelfExtendedInput = {} as GetUserSelfExtendedInput
): Promise<GetUserSelfExtendedReturn> {
  const url = `/user/extended`
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
  const result = (await response.json()) as GetUserSelfExtendedReturn
  return result
}
