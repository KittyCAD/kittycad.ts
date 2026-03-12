import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {} from '../../models.js'

interface VerifyOauthAccountLinkingInput {
  client?: Client
  callback_url?: string
  token: string
}

type VerifyOauthAccountLinkingReturn = unknown

/**
 * Verify OAuth account linking and complete the authentication.
 *
 * This endpoint is called when a user clicks the verification link sent to their email after attempting to log in with OAuth when an existing account with the same email was found. This endpoint validates the token, links the OAuth account to the user, and creates a session.
 *
 * Tags: oauth2
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {string} callback_url Optional callback URL to redirect to after verification (query)
 * @property {string} token The verification token from the email (query)
 * @returns {Promise<VerifyOauthAccountLinkingReturn>} Temporary Redirect
 */
export default async function verify_oauth_account_linking({
  client,
  callback_url,
  token,
}: VerifyOauthAccountLinkingInput): Promise<VerifyOauthAccountLinkingReturn> {
  const path = `/oauth2/verify-account-linking`
  const qs = buildQuery({ callback_url: callback_url, token: token })
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
  const result = (await response.json()) as VerifyOauthAccountLinkingReturn
  return result
}
