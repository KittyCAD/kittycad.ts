import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { PublicProjectVoteResponse, Uuid } from '../../models.js'

interface CreatePublicProjectVoteInput {
  client?: Client
  id: Uuid
}

type CreatePublicProjectVoteReturn = PublicProjectVoteResponse

/**
 * Add the authenticated user's upvote to a published community project.
 *
 * Tags: users
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The identifier. (path)
 * @returns {Promise<CreatePublicProjectVoteReturn>} successful operation
 *
 * Possible return types: PublicProjectVoteResponse
 */
export default async function create_public_project_vote({
  client,
  id,
}: CreatePublicProjectVoteInput): Promise<CreatePublicProjectVoteReturn> {
  const path = `/projects/public/${id}/vote`
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
  const result = (await response.json()) as CreatePublicProjectVoteReturn
  return result
}
