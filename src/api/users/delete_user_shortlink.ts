import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {} from '../../models.js'

interface DeleteUserShortlinkInput {
  client?: Client
  key: string
}

type DeleteUserShortlinkReturn = void

/**
 * Delete a shortlink for a user.
 *
 * This endpoint requires authentication by any Zoo user. It deletes a shortlink for the user.
 *
 * Tags: users, shortlinks
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {string} key The key of the shortlink. (path)
 * @returns {Promise<DeleteUserShortlinkReturn>} resource updated
 */
export default async function delete_user_shortlink({
  client,
  key,
}: DeleteUserShortlinkInput): Promise<DeleteUserShortlinkReturn> {
  const path = `/user/shortlinks/${key}`
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
  return undefined as DeleteUserShortlinkReturn
}
