import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { FileBoundingBox, FileImportFormat, UnitLength } from '../../models.js'

interface CreateFileBoundingBoxInput {
  client?: Client
  src_format: FileImportFormat
  output_unit?: UnitLength
  body: string
}

type CreateFileBoundingBoxReturn = FileBoundingBox

/**
 * Get CAD file bounding box.
 *
 * Import the CAD file into the modeling engine and calculate its bounding box.
 *
 * This endpoint returns the axis-aligned bounding box as a center and dimensions in the output units, using KittyCAD coordinates (+Z up, -Y forward).
 *
 * This operation is always performed asynchronously, regardless of file size. The request returns the `id` of the operation. Use this `id` to get the status and bounding box from the `/async/operations/{id}` endpoint.
 *
 * Tags: file
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {FileImportFormat} src_format The format of the file. (query)
 * @property {UnitLength} output_unit The output unit for the bounding box. (query)
 * @property {string} body Request body payload
 * @returns {Promise<CreateFileBoundingBoxReturn>} successful creation
 *
 * Possible return types: FileBoundingBox
 */
export default async function create_file_bounding_box({
  client,
  src_format,
  output_unit,
  body,
}: CreateFileBoundingBoxInput): Promise<CreateFileBoundingBoxReturn> {
  const path = `/file/bounding-box`
  const qs = buildQuery({ src_format: src_format, output_unit: output_unit })
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
  const result = (await response.json()) as CreateFileBoundingBoxReturn
  return result
}
