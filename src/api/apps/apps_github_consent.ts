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
  const result = (await response.json()) as AppsGithubConsentReturn
  return result
}
