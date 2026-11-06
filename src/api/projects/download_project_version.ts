import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { Uuid, ProjectArchiveFormat } from '../../models.js'

interface DownloadProjectVersionInput {
  client?: Client
  id: Uuid
  version_id: Uuid
  format?: ProjectArchiveFormat
  file_ids?: unknown
}

type DownloadProjectVersionReturn = Response

/**
 * Download all or selected files saved in one project version.
 *
 * Select files with `file_ids=<UUID>,<UUID>`. IDs must belong to this version; omitted files are excluded, including the manifest unless explicitly selected. The response is a tar or zip archive even when selecting one file.
 *
 * Tags: projects
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id Project identifier. (path)
 * @property {Uuid} version_id Requested version identifier. (path)
 * @property {ProjectArchiveFormat} format Archive format to return. Defaults to `tar`. (query)
 * @property {unknown} file_ids Optional comma-separated file IDs from this download's version. Omit to download every file. An empty or malformed list returns HTTP 400 with `error_code: InvalidProjectFileIds`. Any ID outside this version returns HTTP 400 with `error_code: InvalidProjectFileSelection` and a `missing_file_ids` array listing the requested IDs absent from this version. The entire selection fails: requesting ten IDs with one missing returns HTTP 400 without an archive. Missing projects or versions still return HTTP 404. Repeated IDs are included once. Selecting one file still returns the requested archive format. (query)
 * @returns {Promise<DownloadProjectVersionReturn>} Invalid download parameters. InvalidProjectFileSelection includes missing_file_ids.
 */
export default async function download_project_version({
  client,
  id,
  version_id,
  format,
  file_ids,
}: DownloadProjectVersionInput): Promise<DownloadProjectVersionReturn> {
  const path = `/user/projects/${id}/versions/${version_id}/download`
  const qs = buildQuery({ format: format, file_ids: file_ids })
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
  return response
}
