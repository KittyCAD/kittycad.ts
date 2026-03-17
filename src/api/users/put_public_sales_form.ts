import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { WebsiteSalesForm } from '../../models.js'

interface PutPublicSalesFormInput {
  client?: Client
  body: WebsiteSalesForm
}

type PutPublicSalesFormReturn = void

/**
 * Creates a new sales ticket in the internal help desk from the website sales form.
 *
 * This endpoint accepts optional authentication.
 *
 * Tags: users, hidden
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {WebsiteSalesForm} body Request body payload
 * @returns {Promise<PutPublicSalesFormReturn>} successful operation, no content
 */
export default async function put_public_sales_form({
  client,
  body,
}: PutPublicSalesFormInput): Promise<PutPublicSalesFormReturn> {
  const path = `/website/forms/sales`
  const qs = buildQuery({})
  const url = path + qs
  // Backwards compatible for the BASE_URL env variable
  // That used to exist in only this lib, ZOO_HOST exists in the all the other
  // sdks and the CLI.
  const urlBase = client?.baseUrl || 'https://api.zoo.dev'
  const fullUrl = urlBase + url
  // The other sdks use to use KITTYCAD_API_TOKEN, now they still do for
  // backwards compatibility, but the new standard is ZOO_API_TOKEN.
  // For some reason only this lib supported KITTYCAD_TOKEN, so we need to
  // check for that as well.
  const kittycadToken = client ? client.token || '' : ''
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
  return undefined as PutPublicSalesFormReturn
}
