import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { PublicProjectResponse, Uuid } from '../../models.js'

interface GetPublicProjectInput {
  client?: Client
  id: Uuid
}

type GetPublicProjectReturn = PublicProjectResponse

/**
 * Get one publicly visible community project.
 *
 * Tags: projects
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The identifier. (path)
 * @returns {Promise<GetPublicProjectReturn>} successful operation
 *
 * Possible return types: PublicProjectResponse
 */
export default async function get_public_project({
  client,
  id,
}: GetPublicProjectInput): Promise<GetPublicProjectReturn> {
  const path = `/projects/public/${id}`
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
  const result = (await response.json()) as GetPublicProjectReturn
  return result
}
