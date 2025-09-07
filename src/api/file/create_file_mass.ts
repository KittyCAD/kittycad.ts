import { Client } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {
  FileMass_type,
  UnitDensity_type,
  UnitMass_type,
  FileImportFormat_type,
} from '../../models.js'

interface CreateFileMassParams {
  client?: Client
  material_density: number
  material_density_unit: UnitDensity_type
  output_unit: UnitMass_type
  src_format: FileImportFormat_type
  body: string
}

type CreateFileMassReturn = FileMass_type

export default async function create_file_mass({
  client,
  material_density,
  material_density_unit,
  output_unit,
  src_format,
  body,
}: CreateFileMassParams): Promise<CreateFileMassReturn> {
  const url = `/file/mass?material_density=${material_density}&material_density_unit=${material_density_unit}&output_unit=${output_unit}&src_format=${src_format}`
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
  const headers: Record<string, string> = {
    Authorization: `Bearer ${kittycadToken}`,
    'Content-Type': 'application/octet-stream',
  }
  const fetchOptions: RequestInit = {
    method: 'POST',
    headers,
    body,
  }
  const response = await fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as CreateFileMassReturn
  return result
}
