import { Client } from '../../client.js'
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
  const url = `/oauth2/device/confirm`
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
