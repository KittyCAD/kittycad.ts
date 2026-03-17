import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { UserOrgInfo } from '../../models.js'

interface GetUserOrgInput {
  client?: Client
}

type GetUserOrgReturn = UserOrgInfo

/**
 * Get a user's org.
 *
 * This endpoint requires authentication by any Zoo user. It gets the authenticated user's org.
 *
 * If the user is not a member of an org, this endpoint will return a 404.
 *
 * Tags: orgs, users
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @returns {Promise<GetUserOrgReturn>} successful operation
 *
 * Possible return types: UserOrgInfo
 */
export default async function get_user_org(
  { client }: GetUserOrgInput = {} as GetUserOrgInput
): Promise<GetUserOrgReturn> {
  const path = `/user/org`
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
  const result = (await response.json()) as GetUserOrgReturn
  return result
}
