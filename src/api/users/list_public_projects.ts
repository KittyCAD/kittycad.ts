import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { PublicProjectResponse } from '../../models.js'

interface ListPublicProjectsInput {
  client?: Client
}

type ListPublicProjectsReturn = PublicProjectResponse[]

/**
 * List publicly visible community projects for the website/gallery.
 *
 * Tags: users
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @returns {Promise<ListPublicProjectsReturn>} successful operation
 *
 * Possible return types: PublicProjectResponse[]
 */
export default async function list_public_projects(
  { client }: ListPublicProjectsInput = {} as ListPublicProjectsInput
): Promise<ListPublicProjectsReturn> {
  const path = `/projects/public`
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
  const result = (await response.json()) as ListPublicProjectsReturn
  return result
}
