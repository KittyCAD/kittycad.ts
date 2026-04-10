import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { PublicMailingListMembershipRequest } from '../../models.js'

interface PutPublicMailingListSubscribeInput {
  client?: Client
  slug: string
  body: PublicMailingListMembershipRequest
}

type PutPublicMailingListSubscribeReturn = void

/**
 * Publicly subscribe an email address to a mailing list by slug.
 *
 * Tags: users, hidden
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {string} slug Stable public list slug. (path)
 * @property {PublicMailingListMembershipRequest} body Request body payload
 * @returns {Promise<PutPublicMailingListSubscribeReturn>} successful operation, no content
 */
export default async function put_public_mailing_list_subscribe({
  client,
  slug,
  body,
}: PutPublicMailingListSubscribeInput): Promise<PutPublicMailingListSubscribeReturn> {
  const path = `/website/email-marketing-lists/${slug}/subscribe`
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
  headers['Content-Type'] = 'application/json'
  const fetchOptions: RequestInit = {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  return undefined as PutPublicMailingListSubscribeReturn
}
