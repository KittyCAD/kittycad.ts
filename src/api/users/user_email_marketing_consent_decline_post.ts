import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {} from '../../models.js'

interface UserEmailMarketingConsentDeclinePostInput {
  client?: Client
}

type UserEmailMarketingConsentDeclinePostReturn = void

/**
 * Record explicit decline for email marketing consent.
 *
 * Tags: users
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @returns {Promise<UserEmailMarketingConsentDeclinePostReturn>} successful operation, no content
 */
export default async function user_email_marketing_consent_decline_post(
  {
    client,
  }: UserEmailMarketingConsentDeclinePostInput = {} as UserEmailMarketingConsentDeclinePostInput
): Promise<UserEmailMarketingConsentDeclinePostReturn> {
  const path = `/user/email-marketing-consent/decline`
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
    method: 'POST',
    headers,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  return undefined as UserEmailMarketingConsentDeclinePostReturn
}
