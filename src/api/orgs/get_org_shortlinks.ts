import { Client } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { ShortlinkResultsPage, CreatedAtSortMode } from '../../models.js'

interface GetOrgShortlinksInput {
  client?: Client
  limit: number
  page_token: string
  sort_by: CreatedAtSortMode
}

type GetOrgShortlinksReturn = ShortlinkResultsPage

/**
 * Get the shortlinks for an org.
 *
 * This endpoint requires authentication by an org admin. It gets the shortlinks for the authenticated user's org.
 *
 * Tags: orgs, shortlinks
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {number} limit Maximum number of items returned by a single call (query)
 * @property {string} page_token Token returned by previous call to retrieve the subsequent page (query)
 * @property {CreatedAtSortMode} sort_by (query)
 * @returns successful operation
 */
export default async function get_org_shortlinks({
  client,
  limit,
  page_token,
  sort_by,
}: GetOrgShortlinksInput): Promise<GetOrgShortlinksReturn> {
  const url = `/org/shortlinks?limit=${limit}&page_token=${page_token}&sort_by=${sort_by}`
  // Backwards compatible for the BASE_URL env variable
  // That used to exist in only this lib, ZOO_HOST exists in the all the other
  // sdks and the CLI.
  const urlBase =
    process?.env?.ZOO_HOST || process?.env?.BASE_URL || 'https://api.zoo.dev'
  const fullUrl = urlBase + url
  // The other sdks use to use KITTYCAD_API_TOKEN, now they still do for
  // backwards compatibility, but the new standard is ZOO_API_TOKEN.
  // For some reason only this lib supported KITTYCAD_TOKEN, so we need to
  // check for that as well.
  const kittycadToken = client
    ? client.token || process.env.ZOO_API_TOKEN || ''
    : process.env.KITTYCAD_TOKEN ||
      process.env.KITTYCAD_API_TOKEN ||
      process.env.ZOO_API_TOKEN ||
      ''
  const headers: Record<string, string> = {}
  if (kittycadToken) headers.Authorization = `Bearer ${kittycadToken}`
  const fetchOptions: RequestInit = {
    method: 'GET',
    headers,
  }
  const response = await fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as GetOrgShortlinksReturn
  return result
}
