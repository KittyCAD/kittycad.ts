import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { Uuid } from '../../models.js'

interface GetPublicProjectThumbnailInput {
  client?: Client
  id: Uuid
}

type GetPublicProjectThumbnailReturn = unknown

/**
 * Fetch the public thumbnail for a published project.
 *
 * Tags: projects
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The identifier. (path)
 * @returns {Promise<GetPublicProjectThumbnailReturn>} Response payload.
 */
export default async function get_public_project_thumbnail({
  client,
  id,
}: GetPublicProjectThumbnailInput): Promise<GetPublicProjectThumbnailReturn> {
  const path = `/projects/public/${id}/thumbnail`
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
  const result = (await response.json()) as GetPublicProjectThumbnailReturn
  return result
}
