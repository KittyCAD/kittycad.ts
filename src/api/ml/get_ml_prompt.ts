import type { Client } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import type { MlPrompt_type } from '../../models.js'

interface GetMlPromptParams {
  client?: Client
  id: string
}

type GetMlPromptReturn = MlPrompt_type

export default async function get_ml_prompt({
  client,
  id,
}: GetMlPromptParams): Promise<GetMlPromptReturn> {
  const url = `/ml-prompts/${id}`
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
  }
  const fetchOptions: RequestInit = {
    method: 'GET',
    headers,
  }
  const response = await fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as GetMlPromptReturn
  return result
}
