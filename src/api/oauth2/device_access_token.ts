import { Client, buildQuery, buildForm } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { DeviceAccessTokenRequestForm } from '../../models.js'

interface DeviceAccessTokenInput {
  client?: Client
  body: DeviceAccessTokenRequestForm
}

type DeviceAccessTokenReturn = unknown

/**
 * Request a device access token.
 *
 * This endpoint should be polled by the client until the user code is verified and the grant is confirmed.
 *
 * Tags: oauth2, hidden
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {DeviceAccessTokenRequestForm} body Request body payload
 * @returns {Promise<DeviceAccessTokenReturn>} Response payload.
 */
export default async function device_access_token({
  client,
  body,
}: DeviceAccessTokenInput): Promise<DeviceAccessTokenReturn> {
  const path = `/oauth2/device/token`
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
  headers['Content-Type'] = 'application/x-www-form-urlencoded'
  const fetchOptions: RequestInit = {
    method: 'POST',
    headers,
    body: buildForm(body as unknown as Record<string, unknown>),
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as DeviceAccessTokenReturn
  return result
}
