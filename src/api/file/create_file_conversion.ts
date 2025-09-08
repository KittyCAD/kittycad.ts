import { Client } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {
  FileConversion,
  FileExportFormat,
  FileImportFormat,
} from '../../models.js'

interface CreateFileConversionInput {
  client?: Client
  output_format: FileExportFormat
  src_format: FileImportFormat
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
 * @param client Optional client with auth token.
 * @param output_format The format the file should be converted to. (path)
 * @param src_format The format of the file to convert. (path)
 * @param body Request body payload
 * @returns successful creation
 */
export default async function create_file_conversion({
  client,
  output_format,
  src_format,
  body,
}: CreateFileConversionInput): Promise<CreateFileConversionReturn> {
  const url = `/file/conversion/${src_format}/${output_format}`
  // Backwards compatible for the BASE_URL env variable
  // That used to exist in only this lib, ZOO_HOST exists in the all the other
  // sdks and the CLI.
  const urlBase =
    process?.env?.ZOO_HOST || process?.env?.BASE_URL || 'https://api.zoo.dev'
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
  headers['Content-Type'] = 'application/octet-stream'
  const fetchOptions: RequestInit = {
    method: 'POST',
    headers,
    body,
  }
  const response = await fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as CreateFileConversionReturn
  return result
}
