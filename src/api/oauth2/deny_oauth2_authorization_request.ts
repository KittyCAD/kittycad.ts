import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { OAuth2AuthorizationDecisionResponse, Uuid } from '../../models.js'

interface DenyOauth2AuthorizationRequestInput {
  client?: Client
  request_id: Uuid
}

type DenyOauth2AuthorizationRequestReturn = OAuth2AuthorizationDecisionResponse

/**
 * Deny a pending OAuth 2.0 authorization request.
 *
 * Tags: oauth2, hidden
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} request_id The pending authorization request ID. (path)
 * @returns {Promise<DenyOauth2AuthorizationRequestReturn>} successful operation
 *
 * Possible return types: OAuth2AuthorizationDecisionResponse
 */
export default async function deny_oauth2_authorization_request({
  client,
  request_id,
}: DenyOauth2AuthorizationRequestInput): Promise<DenyOauth2AuthorizationRequestReturn> {
  const path = `/oauth2/authorization-requests/${request_id}/deny`
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
    method: 'POST',
    headers,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as DenyOauth2AuthorizationRequestReturn
  return result
}
