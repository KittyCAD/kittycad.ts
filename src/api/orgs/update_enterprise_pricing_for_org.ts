import { Client } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {
  ZooProductSubscriptions,
  Uuid,
  EnterpriseSubscriptionTierPrice,
} from '../../models.js'

interface UpdateEnterprisePricingForOrgInput {
  client?: Client
  id: Uuid
  body: EnterpriseSubscriptionTierPrice
}

type UpdateEnterprisePricingForOrgReturn = ZooProductSubscriptions

/**
 * Set the enterprise price for an organization.
 *
 * You must be a Zoo admin to perform this request.
 *
 * Tags: orgs, hidden
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The organization ID. (path)
 * @property {EnterpriseSubscriptionTierPrice} body Request body payload
 * @returns {Promise<UpdateEnterprisePricingForOrgReturn>} successful operation
 *
 * Possible return types: ZooProductSubscriptions
 */
export default async function update_enterprise_pricing_for_org({
  client,
  id,
  body,
}: UpdateEnterprisePricingForOrgInput): Promise<UpdateEnterprisePricingForOrgReturn> {
  const url = `/orgs/${id}/enterprise/pricing`
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
  const result = (await response.json()) as UpdateEnterprisePricingForOrgReturn
  return result
}
