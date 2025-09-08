import { Client } from '../../client.js'
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
 * @param client Optional client with auth token.
 * @param sig The signature for the given payload (query)
 * @param sso The nonce and redirect URL sent to us by Discourse (query)
 * @returns Temporary Redirect
 */
export default async function community_sso({
  client,
  sig,
  sso,
}: CommunitySsoInput): Promise<CommunitySsoReturn> {
  const url = `/community/sso?sig=${sig}&sso=${sso}`
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
  const result = (await response.json()) as CommunitySsoReturn
  return result
}
