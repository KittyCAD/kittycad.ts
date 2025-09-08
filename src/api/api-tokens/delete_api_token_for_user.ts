import { Client } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { ApiTokenUuid } from '../../models.js'

interface DeleteApiTokenForUserInput {
  client?: Client
  token: ApiTokenUuid
}

type DeleteApiTokenForUserReturn = void

/**
 * Delete an API token for your user.
 *
 * This endpoint requires authentication by any Zoo user. It deletes the requested API token for the user.
 *
 * This endpoint does not actually delete the API token from the database. It merely marks the token as invalid. We still want to keep the token in the database for historical purposes.
 *
 * Tags: api-tokens
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {ApiTokenUuid} token The API token. (path)
 * @returns {Promise<DeleteApiTokenForUserReturn>} successful deletion
 */
export default async function delete_api_token_for_user({
  client,
  token,
}: DeleteApiTokenForUserInput): Promise<DeleteApiTokenForUserReturn> {
  const url = `/user/api-tokens/${token}`
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
  return undefined as DeleteApiTokenForUserReturn
}
