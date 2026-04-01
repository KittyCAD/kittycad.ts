import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { FileSurfaceArea, FileImportFormat, UnitArea } from '../../models.js'

interface CreateFileSurfaceAreaInput {
  client?: Client
  src_format: FileImportFormat
  output_unit?: UnitArea
  body: string
}

type CreateFileSurfaceAreaReturn = FileSurfaceArea

/**
 * Get CAD file surface area.
 *
 * We assume any file given to us has one consistent unit throughout. We also assume the file is at the proper scale.
 *
 * This endpoint returns the square measure units.
 *
 * In the future, we will use the units inside the file if they are given and do any conversions if necessary for the calculation. But currently, that is not supported.
 *
 * Get the surface area of an object in a CAD file. If the file is larger than 25MB, it will be performed asynchronously.
 *
 * If the operation is performed asynchronously, the `id` of the operation will be returned. You can use the `id` returned from the request to get status information about the async operation from the `/async/operations/{id}` endpoint.
 *
 * Tags: file
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {FileImportFormat} src_format The format of the file. (query)
 * @property {UnitArea} output_unit The output unit for the surface area. (query)
 * @property {string} body Request body payload
 * @returns {Promise<CreateFileSurfaceAreaReturn>} successful creation
 *
 * Possible return types: FileSurfaceArea
 */
export default async function create_file_surface_area({
  client,
  src_format,
  output_unit,
  body,
}: CreateFileSurfaceAreaInput): Promise<CreateFileSurfaceAreaReturn> {
  const path = `/file/surface-area`
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
  const result = (await response.json()) as CreateFileSurfaceAreaReturn
  return result
}
