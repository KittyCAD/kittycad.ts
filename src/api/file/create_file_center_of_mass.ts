import { Client } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { FileCenterOfMass, UnitLength, FileImportFormat } from '../../models.js'

interface CreateFileCenterOfMassInput {
  client?: Client
  output_unit: UnitLength
  src_format: FileImportFormat
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
 * @property {UnitLength} output_unit The output unit for the center of mass. (query)
 * @property {FileImportFormat} src_format The format of the file. (query)
 * @property {string} body Request body payload
 * @returns {Promise<CreateFileCenterOfMassReturn>} successful creation
 *
 * Possible return types: FileCenterOfMass
 */
export default async function create_file_center_of_mass({
  client,
  output_unit,
  src_format,
  body,
}: CreateFileCenterOfMassInput): Promise<CreateFileCenterOfMassReturn> {
  const url = `/file/center-of-mass?output_unit=${output_unit}&src_format=${src_format}`
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
  const result = (await response.json()) as CreateFileCenterOfMassReturn
  return result
}
