import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {} from '../../models.js'

interface DeviceAuthVerifyInput {
  client?: Client
  user_code: string
  app_name?: string
}

type DeviceAuthVerifyReturn = unknown

/**
 * Verify an OAuth 2.0 Device Authorization Grant.
 *
 * This endpoint should be accessed in a full user agent (e.g., a browser). If the user is not logged in, we redirect them to the login page and use the `callback_url` parameter to get them to the UI verification form upon logging in. If they are logged in, we redirect them to the UI verification form on the website.
 *
 * Tags: oauth2, hidden
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {string} user_code The user code. (query)
 * @property {string} app_name The originating app's name (query)
 * @returns {Promise<DeviceAuthVerifyReturn>} Temporary Redirect
 */
export default async function device_auth_verify({
  client,
  user_code,
  app_name,
}: DeviceAuthVerifyInput): Promise<DeviceAuthVerifyReturn> {
  const path = `/oauth2/device/verify`
  const qs = buildQuery({ user_code: user_code, app_name: app_name })
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
  const result = (await response.json()) as DeviceAuthVerifyReturn
  return result
}
