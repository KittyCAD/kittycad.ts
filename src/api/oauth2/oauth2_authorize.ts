import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {
  OAuth2AuthorizationResponseType,
  OAuth2Scopes,
  OAuth2CodeChallengeMethod,
} from '../../models.js'

interface Oauth2AuthorizeInput {
  client?: Client
  response_type: OAuth2AuthorizationResponseType
  client_id: string
  redirect_uri: string
  state: string
  scope?: OAuth2Scopes
  code_challenge: string
  code_challenge_method: OAuth2CodeChallengeMethod
}

type Oauth2AuthorizeReturn = unknown

/**
 * Start an OAuth 2.0 authorization code flow with PKCE.
 *
 * Tags: oauth2, hidden
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {OAuth2AuthorizationResponseType} response_type The OAuth response type. (query)
 * @property {string} client_id The OAuth app client ID. (query)
 * @property {string} redirect_uri The redirect URI for the client. (query)
 * @property {string} state Opaque client state to round-trip back to the client. (query)
 * @property {OAuth2Scopes} scope The requested OAuth scopes. (query)
 * @property {string} code_challenge The PKCE code challenge. (query)
 * @property {OAuth2CodeChallengeMethod} code_challenge_method The PKCE challenge method. (query)
 * @returns {Promise<Oauth2AuthorizeReturn>} Temporary Redirect
 */
export default async function oauth2_authorize({
  client,
  response_type,
  client_id,
  redirect_uri,
  state,
  scope,
  code_challenge,
  code_challenge_method,
}: Oauth2AuthorizeInput): Promise<Oauth2AuthorizeReturn> {
  const path = `/oauth2/authorize`
  const qs = buildQuery({
    response_type: response_type,
    client_id: client_id,
    redirect_uri: redirect_uri,
    state: state,
    scope: scope,
    code_challenge: code_challenge,
    code_challenge_method: code_challenge_method,
  })
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
  const result = (await response.json()) as Oauth2AuthorizeReturn
  return result
}
