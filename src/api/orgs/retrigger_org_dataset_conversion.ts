import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { Uuid } from '../../models.js'

interface RetriggerOrgDatasetConversionInput {
  client?: Client
  id: Uuid
  conversion_id: Uuid
}

type RetriggerOrgDatasetConversionReturn = void

/**
 * Retrigger a specific dataset conversion for the caller's org.
 *
 * Tags: orgs
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id Dataset identifier. (path)
 * @property {Uuid} conversion_id Conversion identifier. (path)
 * @returns {Promise<RetriggerOrgDatasetConversionReturn>} resource updated
 */
export default async function retrigger_org_dataset_conversion({
  client,
  id,
  conversion_id,
}: RetriggerOrgDatasetConversionInput): Promise<RetriggerOrgDatasetConversionReturn> {
  const path = `/org/datasets/${id}/conversions/${conversion_id}/retrigger`
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
    method: 'POST',
    headers,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  return undefined as RetriggerOrgDatasetConversionReturn
}
