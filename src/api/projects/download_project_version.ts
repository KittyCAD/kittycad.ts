import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { Uuid, ProjectArchiveFormat } from '../../models.js'

interface DownloadProjectVersionInput {
  client?: Client
  id: Uuid
  version_id: Uuid
  format?: ProjectArchiveFormat
}

type DownloadProjectVersionReturn = unknown

/**
 * Download the files saved in one project version.
 *
 * Tags: projects
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id Project identifier. (path)
 * @property {Uuid} version_id Requested version identifier. (path)
 * @property {ProjectArchiveFormat} format Archive format to return. Defaults to `tar`. (query)
 * @returns {Promise<DownloadProjectVersionReturn>} Response payload.
 */
export default async function download_project_version({
  client,
  id,
  version_id,
  format,
}: DownloadProjectVersionInput): Promise<DownloadProjectVersionReturn> {
  const path = `/user/projects/${id}/versions/${version_id}/download`
  const qs = buildQuery({ format: format })
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
  const result = (await response.json()) as DownloadProjectVersionReturn
  return result
}
