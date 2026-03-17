import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { DiscountCode, StoreCouponParams } from '../../models.js'

interface CreateStoreCouponInput {
  client?: Client
  body: StoreCouponParams
}

type CreateStoreCouponReturn = DiscountCode

/**
 * Create a new store coupon.
 *
 * This endpoint requires authentication by a Zoo employee. It creates a new store coupon.
 *
 * Tags: store, hidden
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {StoreCouponParams} body Request body payload
 * @returns {Promise<CreateStoreCouponReturn>} successful creation
 *
 * Possible return types: DiscountCode
 */
export default async function create_store_coupon({
  client,
  body,
}: CreateStoreCouponInput): Promise<CreateStoreCouponReturn> {
  const path = `/store/coupon`
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
  const result = (await response.json()) as CreateStoreCouponReturn
  return result
}
