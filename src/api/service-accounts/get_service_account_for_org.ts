import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { ServiceAccount, ServiceAccountUuid } from '../../models.js'

interface GetServiceAccountForOrgInput {
  client?: Client
  token: ServiceAccountUuid
}

type GetServiceAccountForOrgReturn = ServiceAccount

/**
 * Get an service account for your org.
 *
 * This endpoint requires authentication by an org admin. It returns details of the requested service account for the organization.
 *
 * Tags: service-accounts
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {ServiceAccountUuid} token The service account. (path)
 * @returns {Promise<GetServiceAccountForOrgReturn>} successful operation
 *
 * Possible return types: ServiceAccount
 */
export default async function get_service_account_for_org({
  client,
  token,
}: GetServiceAccountForOrgInput): Promise<GetServiceAccountForOrgReturn> {
  const path = `/org/service-accounts/${token}`
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
  const result = (await response.json()) as GetServiceAccountForOrgReturn
  return result
}
