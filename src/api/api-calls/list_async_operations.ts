import { Client } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'
import { Pager, createPager } from '../../pagination.js'

import {
  AsyncApiCallResultsPage,
  CreatedAtSortMode,
  ApiCallStatus,
  AsyncApiCall,
} from '../../models.js'

interface ListAsyncOperationsInput {
  client?: Client
  limit: number
  page_token: string
  sort_by: CreatedAtSortMode
  status: ApiCallStatus
}

type ListAsyncOperationsReturn = AsyncApiCallResultsPage

/**
 * List async operations.
 *
 * For async file conversion operations, this endpoint does not return the contents of converted files (`output`). To get the contents use the `/async/operations/{id}` endpoint.
 *
 * This endpoint requires authentication by a Zoo employee.
 *
 * Tags: api-calls, hidden
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {number} limit Maximum number of items returned by a single call (query)
 * @property {string} page_token Token returned by previous call to retrieve the subsequent page (query)
 * @property {CreatedAtSortMode} sort_by (query)
 * @property {ApiCallStatus} status The status to filter by. (query)
 * @returns {Promise<ListAsyncOperationsReturn>} successful operation
 *
 * Possible return types: AsyncApiCallResultsPage
 */
export default async function list_async_operations({
  client,
  limit,
  page_token,
  sort_by,
  status,
}: ListAsyncOperationsInput): Promise<ListAsyncOperationsReturn> {
  const url = `/async/operations?limit=${limit}&page_token=${page_token}&sort_by=${sort_by}&status=${status}`
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
  const fetchOptions: RequestInit = {
    method: 'GET',
    headers,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as ListAsyncOperationsReturn
  return result
}

export function list_async_operationsPager(
  params: ListAsyncOperationsInput
): Pager<ListAsyncOperationsInput, ListAsyncOperationsReturn, AsyncApiCall> {
  return createPager<
    ListAsyncOperationsInput,
    ListAsyncOperationsReturn,
    AsyncApiCall
  >(list_async_operations, params, 'page_token')
}
