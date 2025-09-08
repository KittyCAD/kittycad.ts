import { Client } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { ServiceAccountUuid } from '../../models.js'

interface DeleteServiceAccountForOrgInput {
  client?: Client
  token: ServiceAccountUuid
}

type DeleteServiceAccountForOrgReturn = void

/**
 * Delete an service account for your org.
 *
 * This endpoint requires authentication by an org admin. It deletes the requested service account for the organization.
 *
 * This endpoint does not actually delete the service account from the database. It merely marks the token as invalid. We still want to keep the service account in the database for historical purposes.
 *
 * Tags: service-accounts
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {ServiceAccountUuid} token The service account. (path)
 * @returns {Promise<DeleteServiceAccountForOrgReturn>} successful deletion
 */
export default async function delete_service_account_for_org({
  client,
  token,
}: DeleteServiceAccountForOrgInput): Promise<DeleteServiceAccountForOrgReturn> {
  const url = `/org/service-accounts/${token}`
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
    method: 'DELETE',
    headers,
  }
  const response = await fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  return undefined as DeleteServiceAccountForOrgReturn
}
