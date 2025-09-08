import { Client } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {} from '../../models.js'

interface DeleteUserShortlinkInput {
  client?: Client
  key: string
}

type DeleteUserShortlinkReturn = unknown

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
  const url = `/user/shortlinks/${key}`
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
    method: 'DELETE',
    headers,
  }
  const response = await fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as DeleteUserShortlinkReturn
  return result
}
