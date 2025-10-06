import { File } from '../../models.js'
import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { KclModel, CodeOption } from '../../models.js'

interface CreateProprietaryToKclInput {
  client?: Client
  files: File[]
  code_option?: CodeOption
}

type CreateProprietaryToKclReturn = KclModel

/**
 * Converts a proprietary CAD format to KCL.
 *
 * This endpoint is used to convert a proprietary CAD format to KCL. The file passed MUST have feature tree data.
 *
 * A STEP file does not have feature tree data, so it will not work. A sldprt file does have feature tree data, so it will work.
 *
 * This endpoint is designed to work with any native proprietary CAD format, for example: - SolidWorks (.sldprt) - Creo (.prt) - Catia (.catpart) - NX (.prt) - Fusion 360 (.f3d)
 *
 * This endpoint is deterministic, it preserves the original design intent by using the feature tree data. This endpoint does not use any machine learning or AI.
 *
 * This endpoint is currently in beta, and is only available to users with access to the feature. Please contact support if you are interested in getting access.
 *
 * This endpoint might have limitations and bugs, please report any issues you encounter. It will be improved over time.
 *
 * Input filepaths will be normalized and re-canonicalized to be under the current working directory -- so returned paths may differ from provided paths, and care must be taken when handling user provided paths.
 *
 * Tags: ml, hidden
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {CodeOption} code_option The options to run on the code. By default this is set to `execute`. (query)
 * @property {File[]} files Files attached as multipart/form-data.
 * @returns {Promise<CreateProprietaryToKclReturn>} successful creation
 *
 * Possible return types: KclModel
 */
export default async function create_proprietary_to_kcl({
  client,
  files,
  code_option,
}: CreateProprietaryToKclInput): Promise<CreateProprietaryToKclReturn> {
  const path = `/ml/convert/proprietary-to-kcl`
  const qs = buildQuery({ code_option: code_option })
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

  const formData = new FormData()
  files.forEach((file) => {
    formData.append(file.name, file.data, file.name)
  })

  const fetchOptions: RequestInit = {
    method: 'POST',
    headers,
    body: formData,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as CreateProprietaryToKclReturn
  return result
}
