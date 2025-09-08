import { Client } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {
  CustomerBalance,
  UserIdentifier,
  UpdatePaymentBalance,
} from '../../models.js'

interface UpdatePaymentBalanceForAnyUserInput {
  client?: Client
  id: UserIdentifier
  include_total_due: boolean
  body: UpdatePaymentBalance
}

type UpdatePaymentBalanceForAnyUserReturn = CustomerBalance

/**
 * Update balance for an user.
 *
 * This endpoint requires authentication by a Zoo employee. It updates the balance information for the specified user.
 *
 * Tags: payments, hidden
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {UserIdentifier} id The user's identifier (uuid or email). (path)
 * @property {boolean} include_total_due If you would like to return the total due for a user. This makes the API call take longer so it is off by default. (query)
 * @property {UpdatePaymentBalance} body Request body payload
 * @returns {Promise<UpdatePaymentBalanceForAnyUserReturn>} successful operation
 *
 * Possible return types: CustomerBalance
 */
export default async function update_payment_balance_for_any_user({
  client,
  id,
  include_total_due,
  body,
}: UpdatePaymentBalanceForAnyUserInput): Promise<UpdatePaymentBalanceForAnyUserReturn> {
  const url = `/users/${id}/payment/balance?include_total_due=${include_total_due}`
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
  const result = (await response.json()) as UpdatePaymentBalanceForAnyUserReturn
  return result
}
