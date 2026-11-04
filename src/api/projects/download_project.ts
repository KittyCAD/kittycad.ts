import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {
  ProjectDownloadErrorResponse,
  Uuid,
  ProjectArchiveFormat,
} from '../../models.js'

interface DownloadProjectInput {
  client?: Client
  id: Uuid
  format?: ProjectArchiveFormat
  file_ids?: unknown
}

type DownloadProjectReturn = ProjectDownloadErrorResponse

/**
 * Download all or selected files from the current version of a project.
 *
 * Use `file_ids=<UUID>,<UUID>` to select files from the current version. This endpoint resolves the project's current version at request time, so file IDs from before a save may no longer belong to it. To download those files, use `/user/projects/{id}/versions/{version_id}/download` with `version_id` set to the `summary.revision` returned alongside that file list. A single selected file still uses the requested tar or zip archive format.
 *
 * Tags: projects
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The identifier. (path)
 * @property {ProjectArchiveFormat} format Archive format to return. Defaults to `tar`. (query)
 * @property {unknown} file_ids Optional comma-separated file IDs from this download's version. Omit to download every file. An empty or malformed list returns HTTP 400 with `error_code: InvalidProjectFileIds`. Any ID outside this version returns HTTP 400 with `error_code: InvalidProjectFileSelection` and a `missing_file_ids` array listing the requested IDs absent from this version. The entire selection fails: requesting ten IDs with one missing returns HTTP 400 without an archive. Missing projects or versions still return HTTP 404. Repeated IDs are included once. Selecting one file still returns the requested archive format. (query)
 * @returns {Promise<DownloadProjectReturn>} Invalid download parameters. InvalidProjectFileSelection includes missing_file_ids.
 *
 * Possible return types: ProjectDownloadErrorResponse
 */
export default async function download_project({
  client,
  id,
  format,
  file_ids,
}: DownloadProjectInput): Promise<DownloadProjectReturn> {
  const path = `/user/projects/${id}/download`
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
  const result = (await response.json()) as DownloadProjectReturn
  return result
}
