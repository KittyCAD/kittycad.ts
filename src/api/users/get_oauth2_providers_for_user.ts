import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { collectApiList } from '../../pagination.js'

import { AccountProvider } from '../../models.js'

interface GetOauth2ProvidersForUserInput {
  client?: Client
  signal?: AbortSignal
}

type GetOauth2ProvidersForUserReturn = AccountProvider[]

/**
 * Get the OAuth2 providers for your user.
 *
 * If this returns an empty array, then the user has not connected any OAuth2 providers and uses raw email authentication.
 *
 * This endpoint requires authentication by any Zoo user. It gets the providers for the authenticated user.
 *
 * Accepts legacy collections or items/next_page responses and reads all pages.
 * Rejects failed, malformed, or repeated pages without returning partial results.
 *
 * Tags: users
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {AbortSignal} [signal] Cancel the entire list request.
 * @returns {Promise<GetOauth2ProvidersForUserReturn>} successful operation
 *
 * Possible return types: AccountProvider[]
 */
export default async function get_oauth2_providers_for_user(
  {
    client,
    signal,
  }: GetOauth2ProvidersForUserInput = {} as GetOauth2ProvidersForUserInput
): Promise<GetOauth2ProvidersForUserReturn> {
  const path = `/user/oauth2/providers`
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
    signal,
  }
  const _fetch = client?.fetch || fetch
  const items = await collectApiList<GetOauth2ProvidersForUserReturn[number]>(
    fullUrl,
    async (pageUrl) => {
      const response = await _fetch(pageUrl, fetchOptions)
      await throwIfNotOk(response)
      return response.json()
    }
  )
  return items
}
