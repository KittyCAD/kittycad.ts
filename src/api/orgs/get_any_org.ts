import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { Org, Uuid } from '../../models.js'

interface GetAnyOrgInput {
  client?: Client
  id: Uuid
}

type GetAnyOrgReturn = Org

/**
 * Get an org.
 *
 * This endpoint requires authentication by a Zoo employee. It gets the information for the specified org.
 *
 * Tags: orgs, hidden
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The organization ID. (path)
 * @returns {Promise<GetAnyOrgReturn>} successful operation
 *
 * Possible return types: Org
 */
export default async function get_any_org({
  client,
  id,
}: GetAnyOrgInput): Promise<GetAnyOrgReturn> {
  const path = `/orgs/${id}`
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
  const result = (await response.json()) as GetAnyOrgReturn
  return result
}
