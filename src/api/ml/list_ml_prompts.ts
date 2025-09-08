import { Client } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { MlPromptResultsPage, CreatedAtSortMode } from '../../models.js'

interface ListMlPromptsInput {
  client?: Client
  limit: number
  page_token: string
  sort_by: CreatedAtSortMode
}

type ListMlPromptsReturn = MlPromptResultsPage

/**
 * List all ML prompts.
 *
 * For text-to-cad prompts, this will always return the STEP file contents as well as the format the user originally requested.
 *
 * This endpoint requires authentication by a Zoo employee.
 *
 * The ML prompts are returned in order of creation, with the most recently created ML prompts first.
 *
 * Tags: ml, hidden
 *
 * @param client Optional client with auth token.
 * @param limit Maximum number of items returned by a single call (query)
 * @param page_token Token returned by previous call to retrieve the subsequent page (query)
 * @param sort_by (query)
 * @returns successful operation
 */
export default async function list_ml_prompts({
  client,
  limit,
  page_token,
  sort_by,
}: ListMlPromptsInput): Promise<ListMlPromptsReturn> {
  const url = `/ml-prompts?limit=${limit}&page_token=${page_token}&sort_by=${sort_by}`
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
  const fetchOptions: RequestInit = {
    method: 'GET',
    headers,
  }
  const response = await fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as ListMlPromptsReturn
  return result
}
