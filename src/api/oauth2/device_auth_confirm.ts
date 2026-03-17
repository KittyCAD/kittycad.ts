import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { DeviceAuthConfirmParams } from '../../models.js'

interface DeviceAuthConfirmInput {
  client?: Client
  body: DeviceAuthConfirmParams
}

type DeviceAuthConfirmReturn = void

/**
 * Confirm an OAuth 2.0 Device Authorization Grant.
 *
 * This endpoint is designed to be accessed by the user agent (browser), not the client requesting the token. So we do not actually return the token here; it will be returned in response to the poll on `/oauth2/device/token`.
 *
 * Tags: oauth2, hidden
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {DeviceAuthConfirmParams} body Request body payload
 * @returns {Promise<DeviceAuthConfirmReturn>} successful operation, no content
 */
export default async function device_auth_confirm({
  client,
  body,
}: DeviceAuthConfirmInput): Promise<DeviceAuthConfirmReturn> {
  const path = `/oauth2/device/confirm`
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
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  return undefined as DeviceAuthConfirmReturn
}
