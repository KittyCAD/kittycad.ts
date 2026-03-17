import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { AppClientInfo } from '../../models.js'

interface AppsGithubConsentInput {
  client?: Client
}

type AppsGithubConsentReturn = AppClientInfo

/**
 * Get the consent URL for GitHub app authentication.
 *
 * This is different than OAuth 2.0 authentication for users. This endpoint grants access for Zoo to access user's repos.
 *
 * The user doesn't need Zoo OAuth authorization for this endpoint, this is purely for the GitHub permissions to access repos.
 *
 * Tags: apps, hidden
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @returns {Promise<AppsGithubConsentReturn>} successful operation
 *
 * Possible return types: AppClientInfo
 */
export default async function apps_github_consent(
  { client }: AppsGithubConsentInput = {} as AppsGithubConsentInput
): Promise<AppsGithubConsentReturn> {
  const path = `/apps/github/consent`
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
  const fetchOptions: RequestInit = {
    method: 'GET',
    headers,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as AppsGithubConsentReturn
  return result
}
