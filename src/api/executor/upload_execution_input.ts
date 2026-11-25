import { File } from '../../models.js'
import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { ExecutionInputUploadResponse } from '../../models.js'

interface UploadExecutionInputInput {
  client?: Client
  files: File[]
  body: string
}

type UploadExecutionInputReturn = ExecutionInputUploadResponse

/**
 * Upload one input as binary data or multiple named files as multipart form data.
 *
 * Tags: executor
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {File[]} files Files attached as multipart/form-data.
 * @property {string} body Send one raw file or a multipart file per workspace path. Each part's filename is its path.
 * @returns {Promise<UploadExecutionInputReturn>} successful creation
 *
 * Possible return types: ExecutionInputUploadResponse
 */
export default async function upload_execution_input({
  client,
  files,
  body,
}: UploadExecutionInputInput): Promise<UploadExecutionInputReturn> {
  const path = `/execution/inputs`
  const qs = buildQuery({})
  const url = path + qs
  // Backwards compatible for the BASE_URL env variable
  // That used to exist in only this lib, ZOO_HOST exists in the all the other
  // sdks and the CLI.
  const urlBase = client?.baseUrl || 'https://api.zoo.dev'
  const fullUrl = urlBase + url
  // The other sdks use to use KITTYCAD_API_TOKEN, now they still do for
  // backwards compatibility, but the new standard is ZOO_API_TOKEN.
  // For some reason only this lib supported KITTYCAD_TOKEN, so we need to
  // check for that as well.
  const kittycadToken = client ? client.token || '' : ''
  const headers: Record<string, string> = {}
  if (kittycadToken) headers.Authorization = `Bearer ${kittycadToken}`

  const formData = new FormData()
  files.forEach((file) => {
    formData.append(file.name, file.data, file.name)
  })
  formData.append(
    'body',
    new Blob([JSON.stringify(body)], { type: 'application/json' })
  )

  const fetchOptions: RequestInit = {
    method: 'POST',
    headers,
    body: formData,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as UploadExecutionInputReturn
  return result
}
