import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { Uuid } from '../../models.js'

interface DeleteOrgOauth2AppInput {
  client?: Client
  client_id: Uuid
}

type DeleteOrgOauth2AppReturn = void

/**
 * Delete an org OAuth app.
 *
 * This endpoint requires authentication by an org admin. It deactivates the organization's active public OAuth app.
 *
 * Tags: oauth2, orgs
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} client_id The OAuth client identifier. (path)
 * @returns {Promise<DeleteOrgOauth2AppReturn>} successful deletion
 */
export default async function delete_org_oauth2_app({
  client,
  client_id,
}: DeleteOrgOauth2AppInput): Promise<DeleteOrgOauth2AppReturn> {
  const path = `/org/oauth2/apps/${client_id}`
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
    method: 'DELETE',
    headers,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  return undefined as DeleteOrgOauth2AppReturn
}
