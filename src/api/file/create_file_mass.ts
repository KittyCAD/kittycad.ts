import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {
  FileMass,
  UnitDensity,
  UnitMass,
  FileImportFormat,
} from '../../models.js'

interface CreateFileMassInput {
  client?: Client
  material_density: number
  material_density_unit?: UnitDensity
  output_unit?: UnitMass
  src_format: FileImportFormat
  body: string
}

type CreateFileMassReturn = FileMass

/**
 * Get CAD file mass.
 *
 * We assume any file given to us has one consistent unit throughout. We also assume the file is at the proper scale.
 *
 * This endpoint assumes if you are giving a material density in a specific mass unit per cubic measure unit, we return a mass in mass units. The same mass units as passed in the material density.
 *
 * In the future, we will use the units inside the file if they are given and do any conversions if necessary for the calculation. But currently, that is not supported.
 *
 * Get the mass of an object in a CAD file. If the file is larger than 25MB, it will be performed asynchronously.
 *
 * If the operation is performed asynchronously, the `id` of the operation will be returned. You can use the `id` returned from the request to get status information about the async operation from the `/async/operations/{id}` endpoint.
 *
 * Tags: file
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {number} material_density The material density. (query)
 * @property {UnitDensity} material_density_unit The unit of the material density. (query)
 * @property {UnitMass} output_unit The output unit for the mass. (query)
 * @property {FileImportFormat} src_format The format of the file. (query)
 * @property {string} body Request body payload
 * @returns {Promise<CreateFileMassReturn>} successful creation
 *
 * Possible return types: FileMass
 */
export default async function create_file_mass({
  client,
  material_density,
  material_density_unit,
  output_unit,
  src_format,
  body,
}: CreateFileMassInput): Promise<CreateFileMassReturn> {
  const path = `/file/mass`
  const qs = buildQuery({
    material_density: material_density,
    material_density_unit: material_density_unit,
    output_unit: output_unit,
    src_format: src_format,
  })
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
  headers['Content-Type'] = 'application/octet-stream'
  const fetchOptions: RequestInit = {
    method: 'POST',
    headers,
    body,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as CreateFileMassReturn
  return result
}
