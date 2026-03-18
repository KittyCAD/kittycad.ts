import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { OAuth2AppResponse, CreateOAuth2AppRequest } from '../../models.js'

interface CreateOrgOauth2AppInput {
  client?: Client
  body: CreateOAuth2AppRequest
}

type CreateOrgOauth2AppReturn = OAuth2AppResponse

/**
 * Create an org OAuth app.
 *
 * This endpoint requires authentication by an org admin. It creates an active public device-flow app owned by the authenticated organization.
 *
 * Tags: oauth2, orgs
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {CreateOAuth2AppRequest} body Request body payload
 * @returns {Promise<CreateOrgOauth2AppReturn>} successful creation
 *
 * Possible return types: OAuth2AppResponse
 */
export default async function create_org_oauth2_app({
  client,
  body,
}: CreateOrgOauth2AppInput): Promise<CreateOrgOauth2AppReturn> {
  const path = `/org/oauth2/apps`
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
  const result = (await response.json()) as CreateOrgOauth2AppReturn
  return result
}
