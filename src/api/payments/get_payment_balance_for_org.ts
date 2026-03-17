import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { CustomerBalance } from '../../models.js'

interface GetPaymentBalanceForOrgInput {
  client?: Client
  include_total_due?: boolean
}

type GetPaymentBalanceForOrgReturn = CustomerBalance

/**
 * Get balance for your org.
 *
 * This endpoint requires authentication by any member of an org. It gets the balance information for the authenticated user's org.
 *
 * Tags: payments
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {boolean} include_total_due If you would like to return the total due for a user. This makes the API call take longer so it is off by default. (query)
 * @returns {Promise<GetPaymentBalanceForOrgReturn>} successful operation
 *
 * Possible return types: CustomerBalance
 */
export default async function get_payment_balance_for_org({
  client,
  include_total_due,
}: GetPaymentBalanceForOrgInput): Promise<GetPaymentBalanceForOrgReturn> {
  const path = `/org/payment/balance`
  const qs = buildQuery({ include_total_due: include_total_due })
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
  const result = (await response.json()) as GetPaymentBalanceForOrgReturn
  return result
}
