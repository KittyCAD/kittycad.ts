import { File } from '../../models.js'
import { Client } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {
  TextToCadMultiFileIteration,
  TextToCadMultiFileIterationBody,
} from '../../models.js'

interface CreateTextToCadMultiFileIterationInput {
  client?: Client
  files: File[]
  body: TextToCadMultiFileIterationBody
}

type CreateTextToCadMultiFileIterationReturn = TextToCadMultiFileIteration

/**
 * Iterate on a multi-file CAD model with a prompt.
 *
 * This endpoint can iterate on multi-file models.
 *
 * Even if you give specific ranges to edit, the model might change more than just those in order to make the changes you requested without breaking the code.
 *
 * You always get the whole code back, even if you only changed a small part of it. This endpoint will always return all the code back, including files that were not changed. If your original source code imported a stl/gltf/step/etc file, the output will not include that file since the model will never change non-kcl files. The endpoint will only return the kcl files that were changed.
 *
 * This operation is performed asynchronously, the `id` of the operation will be returned. You can use the `id` returned from the request to get status information about the async operation from the `/async/operations/{id}` endpoint.
 *
 * Input filepaths will be normalized and re-canonicalized to be under the current working directory -- so returned paths may differ from provided paths, and care must be taken when handling user provided paths.
 *
 * Tags: ml
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {File[]} files Files attached as multipart/form-data.
 * @property {TextToCadMultiFileIterationBody} body Iteration on a multi-file CAD model
 * @returns {Promise<CreateTextToCadMultiFileIterationReturn>} successful creation
 *
 * Possible return types: TextToCadMultiFileIteration
 */
export default async function create_text_to_cad_multi_file_iteration({
  client,
  files,
  body,
}: CreateTextToCadMultiFileIterationInput): Promise<CreateTextToCadMultiFileIterationReturn> {
  const url = `/ml/text-to-cad/multi-file/iteration`
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
  const headers: Record<string, string> = {
    'Content-Type': 'multipart/form-data',
  }
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
  const result =
    (await response.json()) as CreateTextToCadMultiFileIterationReturn
  return result
}
