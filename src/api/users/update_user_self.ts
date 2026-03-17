import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { UserResponse, UpdateUser } from '../../models.js'

interface UpdateUserSelfInput {
  client?: Client
  body: UpdateUser
}

type UpdateUserSelfReturn = UserResponse

/**
 * Update your user.
 *
 * This endpoint requires authentication by any Zoo user. It updates information about the authenticated user.
 *
 * Tags: users
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {UpdateUser} body Request body payload
 * @returns {Promise<UpdateUserSelfReturn>} successful operation
 *
 * Possible return types: UserResponse
 */
export default async function update_user_self({
  client,
  body,
}: UpdateUserSelfInput): Promise<UpdateUserSelfReturn> {
  const path = `/user`
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
  headers['Content-Type'] = 'application/json'
  const fetchOptions: RequestInit = {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as UpdateUserSelfReturn
  return result
}
