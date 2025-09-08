import { Client } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {} from '../../models.js'

interface DeletePaymentMethodForOrgInput {
  client?: Client
  id: string
}

type DeletePaymentMethodForOrgReturn = unknown

/**
 * Delete a payment method for your org.
 *
 * This endpoint requires authentication by an org admin. It deletes the specified payment method for the authenticated user's org.
 *
 * Tags: payments, hidden
 *
 * @param client Optional client with auth token.
 * @param id The ID of the payment method. (path)
 * @returns successful deletion
 */
export default async function delete_payment_method_for_org({
  client,
  id,
}: DeletePaymentMethodForOrgInput): Promise<DeletePaymentMethodForOrgReturn> {
  const url = `/org/payment/methods/${id}`
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
  const fetchOptions: RequestInit = {
    method: 'DELETE',
    headers,
  }
  const response = await fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as DeletePaymentMethodForOrgReturn
  return result
}
