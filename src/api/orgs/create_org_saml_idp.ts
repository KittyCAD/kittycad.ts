import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {
  SamlIdentityProvider,
  SamlIdentityProviderCreate,
} from '../../models.js'

interface CreateOrgSamlIdpInput {
  client?: Client
  body: SamlIdentityProviderCreate
}

type CreateOrgSamlIdpReturn = SamlIdentityProvider

/**
 * Create a SAML identity provider.
 *
 * This endpoint requires authentication by an org admin.
 *
 * Tags: orgs
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {SamlIdentityProviderCreate} body Request body payload
 * @returns {Promise<CreateOrgSamlIdpReturn>} successful creation
 *
 * Possible return types: SamlIdentityProvider
 */
export default async function create_org_saml_idp({
  client,
  body,
}: CreateOrgSamlIdpInput): Promise<CreateOrgSamlIdpReturn> {
  const path = `/org/saml/idp`
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
  const result = (await response.json()) as CreateOrgSamlIdpReturn
  return result
}
