import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { Uuid } from '../../models.js'

interface DownloadOrgDatasetConversionOriginalInput {
  client?: Client
  id: Uuid
  conversion_id: Uuid
}

type DownloadOrgDatasetConversionOriginalReturn = unknown

/**
 * Download the original source file for a specific dataset conversion.
 *
 * Tags: orgs
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id Dataset identifier. (path)
 * @property {Uuid} conversion_id Conversion identifier. (path)
 * @returns {Promise<DownloadOrgDatasetConversionOriginalReturn>} Response payload.
 */
export default async function download_org_dataset_conversion_original({
  client,
  id,
  conversion_id,
}: DownloadOrgDatasetConversionOriginalInput): Promise<DownloadOrgDatasetConversionOriginalReturn> {
  const path = `/org/datasets/${id}/conversions/${conversion_id}/original`
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
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result =
    (await response.json()) as DownloadOrgDatasetConversionOriginalReturn
  return result
}
