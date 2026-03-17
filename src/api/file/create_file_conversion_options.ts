import { File } from '../../models.js'
import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { FileConversion, ConversionParams } from '../../models.js'

interface CreateFileConversionOptionsInput {
  client?: Client
  files: File[]
  body: ConversionParams
}

type CreateFileConversionOptionsReturn = FileConversion

/**
 * Convert CAD file from one format to another.
 *
 * This takes a HTTP multipart body with these fields in any order:
 *
 *  - The input and output format options (as JSON), name is 'body'.  - The files to convert, in raw binary. Must supply filenames.
 *
 * This starts a conversion job and returns the `id` of the operation. You can use the `id` returned from the request to get status information about the async operation from the `/async/operations/{id}` endpoint.
 *
 * Tags: file
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {File[]} files Files attached as multipart/form-data.
 * @property {ConversionParams} body Convert files to other formats
 * @returns {Promise<CreateFileConversionOptionsReturn>} successful creation
 *
 * Possible return types: FileConversion
 */
export default async function create_file_conversion_options({
  client,
  files,
  body,
}: CreateFileConversionOptionsInput): Promise<CreateFileConversionOptionsReturn> {
  const path = `/file/conversion`
  const qs = buildQuery({})
  const url = path + qs
  // Backwards compatible for the BASE_URL env variable
  // That used to exist in only this lib, ZOO_HOST exists in the all the other
  // sdks and the CLI.
  const env = (
    globalThis as typeof globalThis & {
      process?: { env?: Record<string, string | undefined> }
    }
  ).process?.env
  const urlBase =
    client?.baseUrl || env?.ZOO_HOST || env?.BASE_URL || 'https://api.zoo.dev'
  const fullUrl = urlBase + url
  // The other sdks use to use KITTYCAD_API_TOKEN, now they still do for
  // backwards compatibility, but the new standard is ZOO_API_TOKEN.
  // For some reason only this lib supported KITTYCAD_TOKEN, so we need to
  // check for that as well.
  const kittycadToken = client
    ? client.token || env?.ZOO_API_TOKEN || ''
    : env?.KITTYCAD_TOKEN || env?.KITTYCAD_API_TOKEN || env?.ZOO_API_TOKEN || ''
  const headers: Record<string, string> = {}
  if (kittycadToken) headers.Authorization = `Bearer ${kittycadToken}`

  const formData = new FormData()
  files.forEach((file) => {
    formData.append(file.name, file.data, file.name)
  })
  formData.append('event', JSON.stringify(body))

  const fetchOptions: RequestInit = {
    method: 'POST',
    headers,
    body: formData,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as CreateFileConversionOptionsReturn
  return result
}
