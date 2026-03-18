import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { OAuth2AppResponse, CreateOAuth2AppRequest } from '../../models.js'

interface CreateUserOauth2AppInput {
  client?: Client
  body: CreateOAuth2AppRequest
}

type CreateUserOauth2AppReturn = OAuth2AppResponse

/**
 * Create a personal OAuth app.
 *
 * This endpoint requires authentication by any Zoo user. It creates an active public device-flow app owned by the authenticated user.
 *
 * Tags: oauth2, users
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {CreateOAuth2AppRequest} body Request body payload
 * @returns {Promise<CreateUserOauth2AppReturn>} successful creation
 *
 * Possible return types: OAuth2AppResponse
 */
export default async function create_user_oauth2_app({
  client,
  body,
}: CreateUserOauth2AppInput): Promise<CreateUserOauth2AppReturn> {
  const path = `/user/oauth2/apps`
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
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as CreateUserOauth2AppReturn
  return result
}
