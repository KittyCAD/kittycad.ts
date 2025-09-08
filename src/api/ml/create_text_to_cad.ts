import { Client } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {
  TextToCad,
  FileExportFormat,
  TextToCadCreateBody,
} from '../../models.js'

interface CreateTextToCadInput {
  client?: Client
  output_format: FileExportFormat
  kcl: boolean
  body: TextToCadCreateBody
}

type CreateTextToCadReturn = TextToCad

/**
 * Generate a CAD model from text.
 *
 * Because our source of truth for the resulting model is a STEP file, you will always have STEP file contents when you list your generated models. Any other formats you request here will also be returned when you list your generated models.
 *
 * This operation is performed asynchronously, the `id` of the operation will be returned. You can use the `id` returned from the request to get status information about the async operation from the `/async/operations/{id}` endpoint.
 *
 * One thing to note, if you hit the cache, this endpoint will return right away. So you only have to wait if the status is not `Completed` or `Failed`.
 *
 * Tags: ml
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {FileExportFormat} output_format The format the output file should be converted to. (path)
 * @property {boolean} kcl If we should output the kcl for the model. (query)
 * @property {TextToCadCreateBody} body Request body payload
 * @returns successful creation
 */
export default async function create_text_to_cad({
  client,
  output_format,
  kcl,
  body,
}: CreateTextToCadInput): Promise<CreateTextToCadReturn> {
  const url = `/ai/text-to-cad/${output_format}?kcl=${kcl}`
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
  headers['Content-Type'] = 'application/json'
  const fetchOptions: RequestInit = {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }
  const response = await fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as CreateTextToCadReturn
  return result
}
