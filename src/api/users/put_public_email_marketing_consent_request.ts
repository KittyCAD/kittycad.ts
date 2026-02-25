import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { PublicEmailMarketingConsentRequest } from '../../models.js'

interface PutPublicEmailMarketingConsentRequestInput {
  client?: Client
  body: PublicEmailMarketingConsentRequest
}

type PutPublicEmailMarketingConsentRequestReturn = void

/**
 * Requests public email marketing consent for an email address.
 *
 * Tags: users, hidden
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {PublicEmailMarketingConsentRequest} body Request body payload
 * @returns {Promise<PutPublicEmailMarketingConsentRequestReturn>} successful operation, no content
 */
export default async function put_public_email_marketing_consent_request({
  client,
  body,
}: PutPublicEmailMarketingConsentRequestInput): Promise<PutPublicEmailMarketingConsentRequestReturn> {
  const path = `/website/email-marketing-consent/request`
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
  headers['Content-Type'] = 'application/json'
  const fetchOptions: RequestInit = {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  return undefined as PutPublicEmailMarketingConsentRequestReturn
}
