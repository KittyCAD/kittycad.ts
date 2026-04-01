import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {
  FileConversion,
  FileImportFormat,
  FileExportFormat,
} from '../../models.js'

interface CreateFileConversionInput {
  client?: Client
  src_format: FileImportFormat
  output_format: FileExportFormat
  body: string
}

type CreateFileConversionReturn = FileConversion

/**
 * Convert CAD file with defaults.
 *
 * If you wish to specify the conversion options, use the `/file/conversion` endpoint instead.
 *
 * Convert a CAD file from one format to another. If the file being converted is larger than 25MB, it will be performed asynchronously.
 *
 * If the conversion is performed synchronously, the contents of the converted file (`output`) will be returned as a base64 encoded string.
 *
 * If the operation is performed asynchronously, the `id` of the operation will be returned. You can use the `id` returned from the request to get status information about the async operation from the `/async/operations/{id}` endpoint.
 *
 * Tags: file
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {FileImportFormat} src_format The format of the file to convert. (path)
 * @property {FileExportFormat} output_format The format the file should be converted to. (path)
 * @property {string} body Request body payload
 * @returns {Promise<CreateFileConversionReturn>} successful creation
 *
 * Possible return types: FileConversion
 */
export default async function create_file_conversion({
  client,
  src_format,
  output_format,
  body,
}: CreateFileConversionInput): Promise<CreateFileConversionReturn> {
  const path = `/file/conversion/${src_format}/${output_format}`
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
  headers['Content-Type'] = 'application/octet-stream'
  const fetchOptions: RequestInit = {
    method: 'POST',
    headers,
    body,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as CreateFileConversionReturn
  return result
}
