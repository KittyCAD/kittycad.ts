import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {} from '../../models.js'

interface CommunitySsoInput {
  client?: Client
  sig: string
  sso: string
}

type CommunitySsoReturn = unknown

/**
 * Authorize an inbound auth request from our Community page.
 *
 * Tags: meta, hidden
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {string} sig The signature for the given payload (query)
 * @property {string} sso The nonce and redirect URL sent to us by Discourse (query)
 * @returns {Promise<CommunitySsoReturn>} Temporary Redirect
 */
export default async function community_sso({
  client,
  sig,
  sso,
}: CommunitySsoInput): Promise<CommunitySsoReturn> {
  const path = `/community/sso`
  const qs = buildQuery({ sig: sig, sso: sso })
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
    method: 'GET',
    headers,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as CommunitySsoReturn
  return result
}
