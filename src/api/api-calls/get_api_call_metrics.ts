import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { ApiCallQueryGroup, ApiCallQueryGroupBy } from '../../models.js'

interface GetApiCallMetricsInput {
  client?: Client
  group_by: ApiCallQueryGroupBy
}

type GetApiCallMetricsReturn = ApiCallQueryGroup[]

/**
 * Get API call metrics.
 *
 * This endpoint requires authentication by a Zoo employee. The API calls are grouped by the parameter passed.
 *
 * Tags: api-calls, hidden
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {ApiCallQueryGroupBy} group_by What field to group the metrics by. (query)
 * @returns {Promise<GetApiCallMetricsReturn>} successful operation
 *
 * Possible return types: ApiCallQueryGroup[]
 */
export default async function get_api_call_metrics({
  client,
  group_by,
}: GetApiCallMetricsInput): Promise<GetApiCallMetricsReturn> {
  const path = `/api-call-metrics`
  const qs = buildQuery({ group_by: group_by })
  const url = path + qs
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
  const result = (await response.json()) as GetApiCallMetricsReturn
  return result
}
