import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { PrivacySettings } from '../../models.js'

interface UpdateUserPrivacySettingsInput {
  client?: Client
  body: PrivacySettings
}

type UpdateUserPrivacySettingsReturn = PrivacySettings

/**
 * Update the user's privacy settings.
 *
 * This endpoint requires authentication by any Zoo user. It updates the privacy settings for the user.
 *
 * Tags: users
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {PrivacySettings} body Request body payload
 * @returns {Promise<UpdateUserPrivacySettingsReturn>} successful operation
 *
 * Possible return types: PrivacySettings
 */
export default async function update_user_privacy_settings({
  client,
  body,
}: UpdateUserPrivacySettingsInput): Promise<UpdateUserPrivacySettingsReturn> {
  const path = `/user/privacy`
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
  const result = (await response.json()) as UpdateUserPrivacySettingsReturn
  return result
}
