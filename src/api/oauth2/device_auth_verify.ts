import { Client } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {} from '../../models.js'

interface DeviceAuthVerifyInput {
  client?: Client
  app_name: string
  user_code: string
}

type DeviceAuthVerifyReturn = unknown

/**
 * Verify an OAuth 2.0 Device Authorization Grant.
 *
 * This endpoint should be accessed in a full user agent (e.g., a browser). If the user is not logged in, we redirect them to the login page and use the `callback_url` parameter to get them to the UI verification form upon logging in. If they are logged in, we redirect them to the UI verification form on the website.
 *
 * Tags: oauth2, hidden
 *
 * @param client Optional client with auth token.
 * @param app_name The originating app's name (query)
 * @param user_code The user code. (query)
 * @returns Temporary Redirect
 */
export default async function device_auth_verify({
  client,
  app_name,
  user_code,
}: DeviceAuthVerifyInput): Promise<DeviceAuthVerifyReturn> {
  const url = `/oauth2/device/verify?app_name=${app_name}&user_code=${user_code}`
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
  const result = (await response.json()) as DeviceAuthVerifyReturn
  return result
}
