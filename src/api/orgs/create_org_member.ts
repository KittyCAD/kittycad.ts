import { Client } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { OrgMember, AddOrgMember } from '../../models.js'

interface CreateOrgMemberInput {
  client?: Client
  body: AddOrgMember
}

type CreateOrgMemberReturn = OrgMember

/**
 * Add a member to your org.
 *
 * If the user exists, this will add them to your org. If they do not exist, this will create a new user and add them to your org.
 *
 * In both cases the user gets an email that they have been added to the org.
 *
 * If the user is already in your org, this will return a 400 and a message.
 *
 * If the user is already in a different org, this will return a 400 and a message.
 *
 * This endpoint requires authentication by an org admin. It adds the specified member to the authenticated user's org.
 *
 * Tags: orgs
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {AddOrgMember} body Request body payload
 * @returns {Promise<CreateOrgMemberReturn>} successful creation
 *
 * Possible return types: OrgMember
 */
export default async function create_org_member({
  client,
  body,
}: CreateOrgMemberInput): Promise<CreateOrgMemberReturn> {
  const url = `/org/members`
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
  headers['Content-Type'] = 'application/json'
  const fetchOptions: RequestInit = {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as CreateOrgMemberReturn
  return result
}
