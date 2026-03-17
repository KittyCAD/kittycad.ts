import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { OrgMember, Uuid, UpdateMemberToOrgBody } from '../../models.js'

interface UpdateOrgMemberInput {
  client?: Client
  user_id: Uuid
  body: UpdateMemberToOrgBody
}

type UpdateOrgMemberReturn = OrgMember

/**
 * Update a member of your org.
 *
 * This endpoint requires authentication by an org admin. It updates the specified member of the authenticated user's org.
 *
 * Tags: orgs
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} user_id The user id of the org member. (path)
 * @property {UpdateMemberToOrgBody} body Request body payload
 * @returns {Promise<UpdateOrgMemberReturn>} successful operation
 *
 * Possible return types: OrgMember
 */
export default async function update_org_member({
  client,
  user_id,
  body,
}: UpdateOrgMemberInput): Promise<UpdateOrgMemberReturn> {
  const path = `/org/members/${user_id}`
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
  const result = (await response.json()) as UpdateOrgMemberReturn
  return result
}
