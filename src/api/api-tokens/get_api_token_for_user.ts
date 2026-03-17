import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { ApiToken, ApiTokenUuid } from '../../models.js'

interface GetApiTokenForUserInput {
  client?: Client
  token: ApiTokenUuid
}

type GetApiTokenForUserReturn = ApiToken

/**
 * Get an API token for your user.
 *
 * This endpoint requires authentication by any Zoo user. It returns details of the requested API token for the user.
 *
 * Tags: api-tokens
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {ApiTokenUuid} token The API token. (path)
 * @returns {Promise<GetApiTokenForUserReturn>} successful operation
 *
 * Possible return types: ApiToken
 */
export default async function get_api_token_for_user({
  client,
  token,
}: GetApiTokenForUserInput): Promise<GetApiTokenForUserReturn> {
  const path = `/user/api-tokens/${token}`
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
  const result = (await response.json()) as GetApiTokenForUserReturn
  return result
}
