import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { ServiceAccount } from '../../models.js'

interface CreateServiceAccountForOrgInput {
  client?: Client
  label?: string
}

type CreateServiceAccountForOrgReturn = ServiceAccount

/**
 * Create a new service account for your org.
 *
 * This endpoint requires authentication by an org admin. It creates a new service account for the organization.
 *
 * Tags: service-accounts
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {string} label An optional label for the service account. (query)
 * @returns {Promise<CreateServiceAccountForOrgReturn>} successful creation
 *
 * Possible return types: ServiceAccount
 */
export default async function create_service_account_for_org({
  client,
  label,
}: CreateServiceAccountForOrgInput): Promise<CreateServiceAccountForOrgReturn> {
  const path = `/org/service-accounts`
  const qs = buildQuery({ label: label })
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
    method: 'POST',
    headers,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as CreateServiceAccountForOrgReturn
  return result
}
