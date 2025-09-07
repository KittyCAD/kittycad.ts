import { Client } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {
  TextToCad_type,
  FileExportFormat_type,
  TextToCadCreateBody_type,
} from '../../models.js'

interface CreateTextToCadParams {
  client?: Client
  output_format: FileExportFormat_type
  kcl: boolean
  body: TextToCadCreateBody_type
}

type CreateTextToCadReturn = TextToCad_type

export default async function create_text_to_cad({
  client,
  output_format,
  kcl,
  body,
}: CreateTextToCadParams): Promise<CreateTextToCadReturn> {
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
  const headers: Record<string, string> = {
    Authorization: `Bearer ${kittycadToken}`,
    'Content-Type': 'application/json',
  }
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
