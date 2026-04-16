import { Client, buildQuery, buildForm } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { OAuth2TokenRequestForm } from '../../models.js'

interface Oauth2TokenInput {
  client?: Client
  body: OAuth2TokenRequestForm
}

type Oauth2TokenReturn = unknown

/**
 * Exchange an authorization code or refresh token for an OAuth 2.0 access token.
 *
 * Tags: oauth2, hidden
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {OAuth2TokenRequestForm} body Request body payload
 * @returns {Promise<Oauth2TokenReturn>} Response payload.
 */
export default async function oauth2_token({
  client,
  body,
}: Oauth2TokenInput): Promise<Oauth2TokenReturn> {
  const path = `/oauth2/token`
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
  headers['Content-Type'] = 'application/x-www-form-urlencoded'
  const fetchOptions: RequestInit = {
    method: 'POST',
    headers,
    body: buildForm(body as unknown as Record<string, unknown>),
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as Oauth2TokenReturn
  return result
}
