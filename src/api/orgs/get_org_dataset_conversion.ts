import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { OrgDatasetFileConversionDetails, Uuid } from '../../models.js'

interface GetOrgDatasetConversionInput {
  client?: Client
  conversion_id: Uuid
  id: Uuid
}

type GetOrgDatasetConversionReturn = OrgDatasetFileConversionDetails

/**
 * Fetch the metadata and converted output for a single dataset conversion.
 *
 * Tags: orgs
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} conversion_id Conversion identifier. (path)
 * @property {Uuid} id Dataset identifier. (path)
 * @returns {Promise<GetOrgDatasetConversionReturn>} successful operation
 *
 * Possible return types: OrgDatasetFileConversionDetails
 */
export default async function get_org_dataset_conversion({
  client,
  conversion_id,
  id,
}: GetOrgDatasetConversionInput): Promise<GetOrgDatasetConversionReturn> {
  const path = `/org/datasets/${id}/conversions/${conversion_id}`
  const qs = buildQuery({})
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
  const result = (await response.json()) as GetOrgDatasetConversionReturn
  return result
}
