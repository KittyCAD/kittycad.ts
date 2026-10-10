import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { AnnouncementList } from '../../models.js'

interface GetAnnouncementsInput {
  client?: Client
}

type GetAnnouncementsReturn = AnnouncementList

/**
 * List all active announcements.
 *
 * No authentication is required.
 *
 * Tags: meta
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @returns {Promise<GetAnnouncementsReturn>} successful operation
 *
 * Possible return types: AnnouncementList
 */
export default async function get_announcements(
  { client }: GetAnnouncementsInput = {} as GetAnnouncementsInput
): Promise<GetAnnouncementsReturn> {
  const path = `/announcements`
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
  const result = (await response.json()) as GetAnnouncementsReturn
  return result
}
