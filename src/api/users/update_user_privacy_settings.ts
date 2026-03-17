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
  const env = (
    globalThis as typeof globalThis & {
      process?: { env?: Record<string, string | undefined> }
    }
  ).process?.env
  const urlBase =
    client?.baseUrl || env?.ZOO_HOST || env?.BASE_URL || 'https://api.zoo.dev'
  const fullUrl = urlBase + url
  // The other sdks use to use KITTYCAD_API_TOKEN, now they still do for
  // backwards compatibility, but the new standard is ZOO_API_TOKEN.
  // For some reason only this lib supported KITTYCAD_TOKEN, so we need to
  // check for that as well.
  const kittycadToken = client
    ? client.token || env?.ZOO_API_TOKEN || ''
    : env?.KITTYCAD_TOKEN || env?.KITTYCAD_API_TOKEN || env?.ZOO_API_TOKEN || ''
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
