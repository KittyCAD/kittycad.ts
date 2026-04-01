import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { FileCenterOfMass, FileImportFormat, UnitLength } from '../../models.js'

interface CreateFileCenterOfMassInput {
  client?: Client
  src_format: FileImportFormat
  output_unit?: UnitLength
  body: string
}

type CreateFileCenterOfMassReturn = FileCenterOfMass

/**
 * Get CAD file center of mass.
 *
 * We assume any file given to us has one consistent unit throughout. We also assume the file is at the proper scale.
 *
 * This endpoint returns the cartesian coordinate in world space measure units.
 *
 * In the future, we will use the units inside the file if they are given and do any conversions if necessary for the calculation. But currently, that is not supported.
 *
 * Get the center of mass of an object in a CAD file. If the file is larger than 25MB, it will be performed asynchronously.
 *
 * If the operation is performed asynchronously, the `id` of the operation will be returned. You can use the `id` returned from the request to get status information about the async operation from the `/async/operations/{id}` endpoint.
 *
 * Tags: file
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {FileImportFormat} src_format The format of the file. (query)
 * @property {UnitLength} output_unit The output unit for the center of mass. (query)
 * @property {string} body Request body payload
 * @returns {Promise<CreateFileCenterOfMassReturn>} successful creation
 *
 * Possible return types: FileCenterOfMass
 */
export default async function create_file_center_of_mass({
  client,
  src_format,
  output_unit,
  body,
}: CreateFileCenterOfMassInput): Promise<CreateFileCenterOfMassReturn> {
  const path = `/file/center-of-mass`
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
  const result = (await response.json()) as CreateFileCenterOfMassReturn
  return result
}
