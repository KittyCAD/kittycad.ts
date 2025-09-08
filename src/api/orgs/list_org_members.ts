import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'
import { Pager, createPager } from '../../pagination.js'

import {
  OrgMemberResultsPage,
  CreatedAtSortMode,
  UserOrgRole,
  OrgMember,
} from '../../models.js'

interface ListOrgMembersInput {
  client?: Client
  limit?: number
  page_token?: string
  sort_by?: CreatedAtSortMode
  role?: UserOrgRole
}

type ListOrgMembersReturn = OrgMemberResultsPage

/**
 * List members of your org.
 *
 * This endpoint requires authentication by an org admin. It lists the members of the authenticated user's org.
 *
 * Tags: orgs
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {number} limit Maximum number of items returned by a single call (query)
 * @property {string} page_token Token returned by previous call to retrieve the subsequent page (query)
 * @property {CreatedAtSortMode} sort_by (query)
 * @property {UserOrgRole} role The organization role to filter by. (query)
 * @returns {Promise<ListOrgMembersReturn>} successful operation
 *
 * Possible return types: OrgMemberResultsPage
 */
export default async function list_org_members({
  client,
  limit,
  page_token,
  sort_by,
  role,
}: ListOrgMembersInput): Promise<ListOrgMembersReturn> {
  const path = `/org/members`
  const qs = buildQuery({
    limit: limit,
    page_token: page_token,
    sort_by: sort_by,
    role: role,
  })
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
  const result = (await response.json()) as ListOrgMembersReturn
  return result
}

export function list_org_members_pager(
  params: ListOrgMembersInput
): Pager<ListOrgMembersInput, ListOrgMembersReturn, OrgMember> {
  return createPager<ListOrgMembersInput, ListOrgMembersReturn, OrgMember>(
    list_org_members,
    params,
    'page_token'
  )
}
