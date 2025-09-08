import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { OrgMember, Uuid } from '../../models.js'

interface GetOrgMemberInput {
  client?: Client
  user_id: Uuid
}

type GetOrgMemberReturn = OrgMember

/**
 * Get a member of your org.
 *
 * This endpoint requires authentication by an org admin. It gets the specified member of the authenticated user's org.
 *
 * Tags: orgs
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} user_id The user id of the org member. (path)
 * @returns {Promise<GetOrgMemberReturn>} successful operation
 *
 * Possible return types: OrgMember
 */
export default async function get_org_member({
  client,
  user_id,
}: GetOrgMemberInput): Promise<GetOrgMemberReturn> {
  const path = `/org/members/${user_id}`
  const qs = buildQuery({})
  const url = path + qs
  // Backwards compatible for the BASE_URL env variable
  // That used to exist in only this lib, ZOO_HOST exists in the all the other
  // sdks and the CLI.
  const urlBase =
    client?.baseUrl ||
    process?.env?.ZOO_HOST ||
    process?.env?.BASE_URL ||
    'https://api.zoo.dev'
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
    method: 'GET',
    headers,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as GetOrgMemberReturn
  return result
}
