import { Client } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { Customer, BillingInfo } from '../../models.js'

interface UpdatePaymentInformationForUserInput {
  client?: Client
  body: BillingInfo
}

type UpdatePaymentInformationForUserReturn = Customer

/**
 * Update payment info for your user.
 *
 * This includes billing address, phone, and name.
 *
 * This endpoint requires authentication by any Zoo user. It updates the payment information for the authenticated user.
 *
 * Tags: payments
 *
 * @param client Optional client with auth token.
 * @param body Request body payload
 * @returns successful operation
 */
export default async function update_payment_information_for_user({
  client,
  body,
}: UpdatePaymentInformationForUserInput): Promise<UpdatePaymentInformationForUserReturn> {
  const url = `/user/payment`
  // Backwards compatible for the BASE_URL env variable
  // That used to exist in only this lib, ZOO_HOST exists in the all the other
  // sdks and the CLI.
  const urlBase =
    process?.env?.ZOO_HOST || process?.env?.BASE_URL || 'https://api.zoo.dev'
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
  const response = await fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result =
    (await response.json()) as UpdatePaymentInformationForUserReturn
  return result
}
