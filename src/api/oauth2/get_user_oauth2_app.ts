import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { OAuth2AppResponse, Uuid } from '../../models.js'

interface GetUserOauth2AppInput {
  client?: Client
  client_id: Uuid
}

type GetUserOauth2AppReturn = OAuth2AppResponse

/**
 * Get a personal OAuth app.
 *
 * This endpoint requires authentication by any Zoo user. It returns the authenticated user's active public OAuth app by client ID.
 *
 * Tags: oauth2, users
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} client_id The OAuth client identifier. (path)
 * @returns {Promise<GetUserOauth2AppReturn>} successful operation
 *
 * Possible return types: OAuth2AppResponse
 */
export default async function get_user_oauth2_app({
  client,
  client_id,
}: GetUserOauth2AppInput): Promise<GetUserOauth2AppReturn> {
  const path = `/user/oauth2/apps/${client_id}`
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
  const result = (await response.json()) as GetUserOauth2AppReturn
  return result
}
