import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { OrgDataset, Uuid } from '../../models.js'

interface GetOrgDatasetInput {
  client?: Client
  id: Uuid
}

type GetOrgDatasetReturn = OrgDataset

/**
 * Fetch a single dataset by id so long as it belongs to the authenticated org.
 *
 * Tags: orgs
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The identifier. (path)
 * @returns {Promise<GetOrgDatasetReturn>} successful operation
 *
 * Possible return types: OrgDataset
 */
export default async function get_org_dataset({
  client,
  id,
}: GetOrgDatasetInput): Promise<GetOrgDatasetReturn> {
  const path = `/org/datasets/${id}`
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
  const result = (await response.json()) as GetOrgDatasetReturn
  return result
}
