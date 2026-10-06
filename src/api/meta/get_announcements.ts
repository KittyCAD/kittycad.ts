import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'
import { Pager, createPager } from '../../pagination.js'

import { AnnouncementResultsPage, Announcement } from '../../models.js'

interface GetAnnouncementsInput {
  client?: Client
  limit?: number
  page_token?: string
}

type GetAnnouncementsReturn = AnnouncementResultsPage

/**
 * List all active announcements.
 *
 * No authentication is required. Results are ordered newest first, with the announcement ID breaking ties.
 *
 * Tags: meta
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {number} limit Maximum number of items returned by a single call (query)
 * @property {string} page_token Token returned by previous call to retrieve the subsequent page (query)
 * @returns {Promise<GetAnnouncementsReturn>} successful operation
 *
 * Possible return types: AnnouncementResultsPage
 */
export default async function get_announcements({
  client,
  limit,
  page_token,
}: GetAnnouncementsInput): Promise<GetAnnouncementsReturn> {
  const path = `/announcements`
  const qs = buildQuery({ limit: limit, page_token: page_token })
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

export function get_announcements_pager(
  params: GetAnnouncementsInput
): Pager<GetAnnouncementsInput, GetAnnouncementsReturn, Announcement> {
  return createPager<
    GetAnnouncementsInput,
    GetAnnouncementsReturn,
    Announcement
  >(get_announcements, params, 'page_token')
}
