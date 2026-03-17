import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { Session, SessionUuid } from '../../models.js'

interface GetSessionForUserInput {
  client?: Client
  token: SessionUuid
}

type GetSessionForUserReturn = Session

/**
 * Get a session for your user.
 *
 * This endpoint requires authentication by any Zoo user. It returns details of the requested API token for the user.
 *
 * Tags: users
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {SessionUuid} token The API token. (path)
 * @returns {Promise<GetSessionForUserReturn>} successful operation
 *
 * Possible return types: Session
 */
export default async function get_session_for_user({
  client,
  token,
}: GetSessionForUserInput): Promise<GetSessionForUserReturn> {
  const path = `/user/session/${token}`
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
  const result = (await response.json()) as GetSessionForUserReturn
  return result
}
