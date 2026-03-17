import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { ApiToken } from '../../models.js'

interface CreateApiTokenForUserInput {
  client?: Client
  label?: string
}

type CreateApiTokenForUserReturn = ApiToken

/**
 * Create a new API token for your user.
 *
 * This endpoint requires authentication by any Zoo user. It creates a new API token for the authenticated user.
 *
 * Tags: api-tokens
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {string} label An optional label for the API token. (query)
 * @returns {Promise<CreateApiTokenForUserReturn>} successful creation
 *
 * Possible return types: ApiToken
 */
export default async function create_api_token_for_user({
  client,
  label,
}: CreateApiTokenForUserInput): Promise<CreateApiTokenForUserReturn> {
  const path = `/user/api-tokens`
  const qs = buildQuery({ label: label })
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
  const result = (await response.json()) as CreateApiTokenForUserReturn
  return result
}
