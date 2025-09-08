import { Client } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { OAuth2ClientInfo, AccountProvider } from '../../models.js'

interface Oauth2ProviderConsentInput {
  client?: Client
  provider: AccountProvider
  callback_url: string
}

type Oauth2ProviderConsentReturn = OAuth2ClientInfo

/**
 * Get the consent URL and other information for the OAuth 2.0 provider.
 *
 * Tags: oauth2, hidden
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {AccountProvider} provider The provider. (path)
 * @property {string} callback_url The URL to redirect back to after we have authenticated. (query)
 * @returns {Promise<Oauth2ProviderConsentReturn>} successful operation
 *
 * Possible return types: OAuth2ClientInfo
 */
export default async function oauth2_provider_consent({
  client,
  provider,
  callback_url,
}: Oauth2ProviderConsentInput): Promise<Oauth2ProviderConsentReturn> {
  const url = `/oauth2/provider/${provider}/consent?callback_url=${callback_url}`
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
    method: 'GET',
    headers,
  }
  const response = await fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as Oauth2ProviderConsentReturn
  return result
}
