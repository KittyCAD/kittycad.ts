import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { SamlIdentityProvider } from '../../models.js'

interface GetOrgSamlIdpInput {
  client?: Client
}

type GetOrgSamlIdpReturn = SamlIdentityProvider

/**
 * Get the SAML identity provider.
 *
 * This endpoint requires authentication by an org admin.
 *
 * Tags: orgs
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @returns {Promise<GetOrgSamlIdpReturn>} successful operation
 *
 * Possible return types: SamlIdentityProvider
 */
export default async function get_org_saml_idp(
  { client }: GetOrgSamlIdpInput = {} as GetOrgSamlIdpInput
): Promise<GetOrgSamlIdpReturn> {
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
  const fetchOptions: RequestInit = {
    method: 'GET',
    headers,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as GetOrgSamlIdpReturn
  return result
}
