import { Client } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { Org, OrgDetails } from '../../models.js'

interface CreateOrgInput {
  client?: Client
  body: OrgDetails
}

type CreateOrgReturn = Org

/**
 * Create an org.
 *
 * This endpoint requires authentication by a Zoo user that is not already in an org. It creates a new org for the authenticated user and makes them an admin.
 *
 * Tags: orgs
 *
 * @param client Optional client with auth token.
 * @param body Request body payload
 * @returns successful creation
 */
export default async function create_org({
  client,
  body,
}: CreateOrgInput): Promise<CreateOrgReturn> {
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
  headers['Content-Type'] = 'application/json'
  const fetchOptions: RequestInit = {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }
  const response = await fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as CreateOrgReturn
  return result
}
