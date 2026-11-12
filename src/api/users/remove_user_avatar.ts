import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {} from '../../models.js'

interface RemoveUserAvatarInput {
  client?: Client
}

type RemoveUserAvatarReturn = void

/**
 * Remove the profile photo and prevent future sign-ins from importing it again.
 *
 * Community profile synchronization is best effort.
 *
 * Tags: users
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @returns {Promise<RemoveUserAvatarReturn>} successful deletion
 */
export default async function remove_user_avatar(
  { client }: RemoveUserAvatarInput = {} as RemoveUserAvatarInput
): Promise<RemoveUserAvatarReturn> {
  const path = `/user/avatar`
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
    method: 'DELETE',
    headers,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  return undefined as RemoveUserAvatarReturn
}
