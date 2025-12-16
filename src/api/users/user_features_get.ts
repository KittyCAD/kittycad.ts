import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { UserFeatureList } from '../../models.js'

interface UserFeaturesGetInput {
  client?: Client
}

type UserFeaturesGetReturn = UserFeatureList

/**
 * List user-visible feature flags enabled for the authenticated user.
 *
 * Returns only features that are marked as safe for exposure to clients and currently resolved to `true` for the requesting user (including org overrides).
 *
 * Tags: users
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @returns {Promise<UserFeaturesGetReturn>} successful operation
 *
 * Possible return types: UserFeatureList
 */
export default async function user_features_get(
  { client }: UserFeaturesGetInput = {} as UserFeaturesGetInput
): Promise<UserFeaturesGetReturn> {
  const path = `/user/features`
  const qs = buildQuery({})
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
  const result = (await response.json()) as UserFeaturesGetReturn
  return result
}
