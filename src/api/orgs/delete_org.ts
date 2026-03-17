import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {} from '../../models.js'

interface DeleteOrgInput {
  client?: Client
}

type DeleteOrgReturn = void

/**
 * Delete an org.
 *
 * In order to delete an org, you must first delete all of its members, except yourself.
 *
 * You must also have no outstanding invoices or unpaid balances.
 *
 * This endpoint requires authentication by an org admin. It deletes the authenticated user's org.
 *
 * Tags: orgs, hidden
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @returns {Promise<DeleteOrgReturn>} successful deletion
 */
export default async function delete_org(
  { client }: DeleteOrgInput = {} as DeleteOrgInput
): Promise<DeleteOrgReturn> {
  const path = `/org`
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
  return undefined as DeleteOrgReturn
}
