import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { Org, OrgDetails } from '../../models.js'

interface UpdateOrgInput {
  client?: Client
  body: OrgDetails
}

type UpdateOrgReturn = Org

/**
 * Update an org.
 *
 * This endpoint requires authentication by an org admin. It updates the authenticated user's org.
 *
 * Tags: orgs
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {OrgDetails} body Request body payload
 * @returns {Promise<UpdateOrgReturn>} successful operation
 *
 * Possible return types: Org
 */
export default async function update_org({
  client,
  body,
}: UpdateOrgInput): Promise<UpdateOrgReturn> {
  const path = `/org`
  const qs = buildQuery({})
  const url = path + qs
  // Backwards compatible for the BASE_URL env variable
  // That used to exist in only this lib, ZOO_HOST exists in the all the other
  // sdks and the CLI.
  const env = (
    globalThis as typeof globalThis & {
      process?: { env?: Record<string, string | undefined> }
    }
  ).process?.env
  const urlBase =
    client?.baseUrl || env?.ZOO_HOST || env?.BASE_URL || 'https://api.zoo.dev'
  const fullUrl = urlBase + url
  // The other sdks use to use KITTYCAD_API_TOKEN, now they still do for
  // backwards compatibility, but the new standard is ZOO_API_TOKEN.
  // For some reason only this lib supported KITTYCAD_TOKEN, so we need to
  // check for that as well.
  const kittycadToken = client
    ? client.token || env?.ZOO_API_TOKEN || ''
    : env?.KITTYCAD_TOKEN || env?.KITTYCAD_API_TOKEN || env?.ZOO_API_TOKEN || ''
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
  const result = (await response.json()) as UpdateOrgReturn
  return result
}
