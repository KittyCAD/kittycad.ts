import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { Uuid } from '../../models.js'

interface DeleteUserAddressInput {
  client?: Client
  id: Uuid
  expected_revision: Uuid
}

type DeleteUserAddressReturn = void

/**
 * Remove a personal address from future selection.
 *
 * Requires its current expected_revision. Revisions pinned by orders remain available until account erasure. An active billing address cannot be removed.
 *
 * Tags: addresses
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The identifier. (path)
 * @property {Uuid} expected_revision revision_id returned when the card was loaded. (query)
 * @returns {Promise<DeleteUserAddressReturn>} successful deletion
 */
export default async function delete_user_address({
  client,
  id,
  expected_revision,
}: DeleteUserAddressInput): Promise<DeleteUserAddressReturn> {
  const path = `/user/addresses/${id}`
  const qs = buildQuery({ expected_revision: expected_revision })
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
    method: 'DELETE',
    headers,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  return undefined as DeleteUserAddressReturn
}
