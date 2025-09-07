import type { Client } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'
import type { File } from '../../models.js'

import type {
  TextToCadMultiFileIterationBody_type,
  TextToCadMultiFileIteration_type,
} from '../../models.js'

interface CreateTextToCadMultiFileIterationParams {
  client?: Client
  files: File[]
  body: TextToCadMultiFileIterationBody_type
}

type CreateTextToCadMultiFileIterationReturn = TextToCadMultiFileIteration_type

export default async function create_text_to_cad_multi_file_iteration({
  client,
  files,
  body,
}: CreateTextToCadMultiFileIterationParams): Promise<CreateTextToCadMultiFileIterationReturn> {
  const url = `/ml/text-to-cad/multi-file/iteration`
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
    'Content-Type': 'multipart/form-data',
  }

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
  const response = await fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result =
    (await response.json()) as CreateTextToCadMultiFileIterationReturn
  return result
}
