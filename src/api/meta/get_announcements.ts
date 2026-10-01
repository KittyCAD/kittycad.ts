import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { collectApiList } from '../../pagination.js'

import { AnnouncementList } from '../../models.js'

interface GetAnnouncementsInput {
  client?: Client
  signal?: AbortSignal
}

type GetAnnouncementsReturn = AnnouncementList

/**
 * List all active announcements.
 *
 * No authentication is required.
 *
 * Accepts legacy collections or items/next_page responses and reads all pages.
 * Rejects failed, malformed, or repeated pages without returning partial results.
 *
 * Tags: meta
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {AbortSignal} [signal] Cancel the entire list request.
 * @returns {Promise<GetAnnouncementsReturn>} successful operation
 *
 * Possible return types: AnnouncementList
 */
export default async function get_announcements(
  { client, signal }: GetAnnouncementsInput = {} as GetAnnouncementsInput
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
    signal,
  }
  const _fetch = client?.fetch || fetch
  const items = await collectApiList<
    GetAnnouncementsReturn['announcements'][number]
  >(
    fullUrl,
    async (pageUrl) => {
      const response = await _fetch(pageUrl, fetchOptions)
      await throwIfNotOk(response)
      return response.json()
    },
    'announcements'
  )
  return { announcements: items }
}
