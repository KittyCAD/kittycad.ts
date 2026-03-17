import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { PrivacySettings } from '../../models.js'

interface GetOrgPrivacySettingsInput {
  client?: Client
}

type GetOrgPrivacySettingsReturn = PrivacySettings

/**
 * Get the privacy settings for an org.
 *
 * This endpoint requires authentication by an org admin. It gets the privacy settings for the authenticated user's org.
 *
 * Tags: orgs
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @returns {Promise<GetOrgPrivacySettingsReturn>} successful operation
 *
 * Possible return types: PrivacySettings
 */
export default async function get_org_privacy_settings(
  { client }: GetOrgPrivacySettingsInput = {} as GetOrgPrivacySettingsInput
): Promise<GetOrgPrivacySettingsReturn> {
  const path = `/org/privacy`
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
  const fetchOptions: RequestInit = {
    method: 'GET',
    headers,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as GetOrgPrivacySettingsReturn
  return result
}
