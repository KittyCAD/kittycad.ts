import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { Uuid } from '../../models.js'

interface DownloadExecutionJobArtifactInput {
  client?: Client
  id: Uuid
  artifact_id: Uuid
}

type DownloadExecutionJobArtifactReturn = unknown

/**
 * Download a verified private execution artifact with bounded streaming.
 *
 * Tags: executor
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id Owning job. (path)
 * @property {Uuid} artifact_id Archive-scoped artifact. (path)
 * @returns {Promise<DownloadExecutionJobArtifactReturn>} The retained artifact bytes.
 */
export default async function download_execution_job_artifact({
  client,
  id,
  artifact_id,
}: DownloadExecutionJobArtifactInput): Promise<DownloadExecutionJobArtifactReturn> {
  const path = `/execution/jobs/${id}/artifacts/${artifact_id}`
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
  const result = (await response.json()) as DownloadExecutionJobArtifactReturn
  return result
}
