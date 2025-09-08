import { Client } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {} from '../../models.js'

interface DeleteOrgInput {
  client?: Client
}

type DeleteOrgReturn = unknown

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
 * @param client Optional client with auth token.
 * @returns successful deletion
 */
export default async function delete_org(
  { client }: DeleteOrgInput = {} as DeleteOrgInput
): Promise<DeleteOrgReturn> {
  const url = `/org`
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
    method: 'DELETE',
    headers,
  }
  const response = await fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as DeleteOrgReturn
  return result
}
