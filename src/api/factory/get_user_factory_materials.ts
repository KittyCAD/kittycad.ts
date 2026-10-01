import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { collectApiList } from '../../pagination.js'

import { FactoryCustomerCatalogOption } from '../../models.js'

interface GetUserFactoryMaterialsInput {
  client?: Client
  signal?: AbortSignal
}

type GetUserFactoryMaterialsReturn = FactoryCustomerCatalogOption[]

/**
 * List materials currently available for customer Factory submissions.
 *
 * Internal-only entries are omitted. Clients should refetch this endpoint after a catalog validation error before asking the customer to choose again.
 *
 * Accepts legacy collections or items/next_page responses and reads all pages.
 * Rejects failed, malformed, or repeated pages without returning partial results.
 *
 * Tags: factory
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {AbortSignal} [signal] Cancel the entire list request.
 * @returns {Promise<GetUserFactoryMaterialsReturn>} successful operation
 *
 * Possible return types: FactoryCustomerCatalogOption[]
 */
export default async function get_user_factory_materials(
  {
    client,
    signal,
  }: GetUserFactoryMaterialsInput = {} as GetUserFactoryMaterialsInput
): Promise<GetUserFactoryMaterialsReturn> {
  const path = `/user/factory/materials`
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
    method: 'GET',
    headers,
    signal,
  }
  const _fetch = client?.fetch || fetch
  const items = await collectApiList<GetUserFactoryMaterialsReturn[number]>(
    fullUrl,
    async (pageUrl) => {
      const response = await _fetch(pageUrl, fetchOptions)
      await throwIfNotOk(response)
      return response.json()
    }
  )
  return items
}
