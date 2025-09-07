import type { Client } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import type {
  ZooProductSubscriptionsOrgRequest_type,
  ZooProductSubscriptions_type,
} from '../../models.js'

interface UpdateOrgSubscriptionParams {
  client?: Client
  body: ZooProductSubscriptionsOrgRequest_type
}

type UpdateOrgSubscriptionReturn = ZooProductSubscriptions_type

export default async function update_org_subscription({
  client,
  body,
}: UpdateOrgSubscriptionParams): Promise<UpdateOrgSubscriptionReturn> {
  const url = `/org/payment/subscriptions`
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
  const headers: Record<string, string> = {
    Authorization: `Bearer ${kittycadToken}`,
    'Content-Type': 'application/json',
  }
  const fetchOptions: RequestInit = {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  }
  const response = await fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as UpdateOrgSubscriptionReturn
  return result
}
