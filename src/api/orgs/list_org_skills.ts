import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'
import { Pager, createPager } from '../../pagination.js'

import { OrgSkillResponseResultsPage, OrgSkillResponse } from '../../models.js'

interface ListOrgSkillsInput {
  client?: Client
  limit?: number
  page_token?: string
}

type ListOrgSkillsReturn = OrgSkillResponseResultsPage

/**
 * List every skill that belongs to the caller's organization, ordered by name.
 *
 * Tags: orgs
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {number} limit Maximum number of items returned by a single call (query)
 * @property {string} page_token Token returned by previous call to retrieve the subsequent page (query)
 * @returns {Promise<ListOrgSkillsReturn>} successful operation
 *
 * Possible return types: OrgSkillResponseResultsPage
 */
export default async function list_org_skills({
  client,
  limit,
  page_token,
}: ListOrgSkillsInput): Promise<ListOrgSkillsReturn> {
  const path = `/org/skills`
  const qs = buildQuery({ limit: limit, page_token: page_token })
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
    method: 'GET',
    headers,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as ListOrgSkillsReturn
  return result
}

export function list_org_skills_pager(
  params: ListOrgSkillsInput
): Pager<ListOrgSkillsInput, ListOrgSkillsReturn, OrgSkillResponse> {
  return createPager<ListOrgSkillsInput, ListOrgSkillsReturn, OrgSkillResponse>(
    list_org_skills,
    params,
    'page_token'
  )
}
