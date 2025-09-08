import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { AccountProvider } from '../../models.js'

interface Oauth2ProviderCallbackInput {
  client?: Client
  provider: AccountProvider
  code?: string
  id_token?: string
  state?: string
  user?: string
}

type Oauth2ProviderCallbackReturn = unknown

/**
 * Listen for callbacks for the OAuth 2.0 provider.
 *
 * Tags: oauth2, hidden
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {AccountProvider} provider The provider. (path)
 * @property {string} code The authorization code. (query)
 * @property {string} id_token For Apple only, a JSON web token containing the user’s identity information. (query)
 * @property {string} state The state that we had passed in through the user consent URL. (query)
 * @property {string} user For Apple only, a JSON string containing the data requested in the scope property. The returned data is in the following format: `{ "name": { "firstName": string, "lastName": string }, "email": string }` (query)
 * @returns {Promise<Oauth2ProviderCallbackReturn>} Temporary Redirect
 */
export default async function oauth2_provider_callback({
  client,
  provider,
  code,
  id_token,
  state,
  user,
}: Oauth2ProviderCallbackInput): Promise<Oauth2ProviderCallbackReturn> {
  const path = `/oauth2/provider/${provider}/callback`
  const qs = buildQuery({
    code: code,
    id_token: id_token,
    state: state,
    user: user,
  })
  const url = path + qs
  // Backwards compatible for the BASE_URL env variable
  // That used to exist in only this lib, ZOO_HOST exists in the all the other
  // sdks and the CLI.
  const urlBase =
    client?.baseUrl ||
    process?.env?.ZOO_HOST ||
    process?.env?.BASE_URL ||
    'https://api.zoo.dev'
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
    method: 'GET',
    headers,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as Oauth2ProviderCallbackReturn
  return result
}
