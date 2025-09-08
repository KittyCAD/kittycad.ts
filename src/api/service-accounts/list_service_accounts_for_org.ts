import { Client } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'
import { Pager, createPager } from '../../pagination.js'

import {
  ServiceAccountResultsPage,
  CreatedAtSortMode,
  ServiceAccount,
} from '../../models.js'

interface ListServiceAccountsForOrgInput {
  client?: Client
  limit: number
  page_token: string
  sort_by: CreatedAtSortMode
}

type ListServiceAccountsForOrgReturn = ServiceAccountResultsPage

/**
 * List service accounts for your org.
 *
 * This endpoint requires authentication by an org admin. It returns the service accounts for the organization.
 *
 * The service accounts are returned in order of creation, with the most recently created service accounts first.
 *
 * Tags: service-accounts
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {number} limit Maximum number of items returned by a single call (query)
 * @property {string} page_token Token returned by previous call to retrieve the subsequent page (query)
 * @property {CreatedAtSortMode} sort_by (query)
 * @returns {Promise<ListServiceAccountsForOrgReturn>} successful operation
 *
 * Possible return types: ServiceAccountResultsPage
 */
export default async function list_service_accounts_for_org({
  client,
  limit,
  page_token,
  sort_by,
}: ListServiceAccountsForOrgInput): Promise<ListServiceAccountsForOrgReturn> {
  const url = `/org/service-accounts?limit=${limit}&page_token=${page_token}&sort_by=${sort_by}`
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
    method: 'GET',
    headers,
  }
  const response = await fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as ListServiceAccountsForOrgReturn
  return result
}

export function list_service_accounts_for_orgPager(
  params: ListServiceAccountsForOrgInput
): Pager<
  ListServiceAccountsForOrgInput,
  ListServiceAccountsForOrgReturn,
  ServiceAccount
> {
  return createPager<
    ListServiceAccountsForOrgInput,
    ListServiceAccountsForOrgReturn,
    ServiceAccount
  >(list_service_accounts_for_org, params, 'page_token')
}
