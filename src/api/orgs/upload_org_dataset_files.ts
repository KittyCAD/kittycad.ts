import { File } from '../../models.js'
import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { UploadOrgDatasetFilesResponse, Uuid } from '../../models.js'

interface UploadOrgDatasetFilesInput {
  client?: Client
  files: File[]
  id: Uuid
}

type UploadOrgDatasetFilesReturn = UploadOrgDatasetFilesResponse

/**
 * Upload source files into a Zoo-managed dataset.
 *
 * This endpoint accepts `multipart/form-data` where each file part becomes a source object in the dataset. Paths are normalized and must be relative.
 *
 * Tags: orgs
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The identifier. (path)
 * @property {File[]} files Files attached as multipart/form-data.
 * @returns {Promise<UploadOrgDatasetFilesReturn>} successfully enqueued operation
 *
 * Possible return types: UploadOrgDatasetFilesResponse
 */
export default async function upload_org_dataset_files({
  client,
  files,
  id,
}: UploadOrgDatasetFilesInput): Promise<UploadOrgDatasetFilesReturn> {
  const path = `/org/datasets/${id}/uploads`
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

  const formData = new FormData()
  files.forEach((file) => {
    formData.append(file.name, file.data, file.name)
  })

  const fetchOptions: RequestInit = {
    method: 'POST',
    headers,
    body: formData,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as UploadOrgDatasetFilesReturn
  return result
}
