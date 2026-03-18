import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {
  OAuth2AppResponse,
  Uuid,
  UpdateOAuth2AppRequest,
} from '../../models.js'

interface UpdateUserOauth2AppInput {
  client?: Client
  client_id: Uuid
  body: UpdateOAuth2AppRequest
}

type UpdateUserOauth2AppReturn = OAuth2AppResponse

/**
 * Update a personal OAuth app.
 *
 * This endpoint requires authentication by any Zoo user. It updates the name of the authenticated user's active public OAuth app.
 *
 * Tags: oauth2, users
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} client_id The OAuth client identifier. (path)
 * @property {UpdateOAuth2AppRequest} body Request body payload
 * @returns {Promise<UpdateUserOauth2AppReturn>} successful operation
 *
 * Possible return types: OAuth2AppResponse
 */
export default async function update_user_oauth2_app({
  client,
  client_id,
  body,
}: UpdateUserOauth2AppInput): Promise<UpdateUserOauth2AppReturn> {
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
  headers['Content-Type'] = 'application/json'
  const fetchOptions: RequestInit = {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as UpdateUserOauth2AppReturn
  return result
}
