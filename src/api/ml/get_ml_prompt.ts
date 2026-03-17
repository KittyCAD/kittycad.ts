import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { MlPromptResponse } from '../../models.js'

interface GetMlPromptInput {
  client?: Client
  id: string
}

type GetMlPromptReturn = MlPromptResponse

/**
 * Get a ML prompt.
 *
 * This endpoint requires authentication by a Zoo employee.
 *
 * Tags: ml, hidden
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {string} id The id of the model to give feedback to. (path)
 * @returns {Promise<GetMlPromptReturn>} successful operation
 *
 * Possible return types: MlPromptResponse
 */
export default async function get_ml_prompt({
  client,
  id,
}: GetMlPromptInput): Promise<GetMlPromptReturn> {
  const path = `/ml-prompts/${id}`
  const qs = buildQuery({})
  const url = path + qs
  // Backwards compatible for the BASE_URL env variable
  // That used to exist in only this lib, ZOO_HOST exists in the all the other
  // sdks and the CLI.
  const urlBase = client?.baseUrl || 'https://api.zoo.dev'
  const fullUrl = urlBase + url
  const kittycadToken = client ? client.token || '' : ''
  const headers: Record<string, string> = {}
  if (kittycadToken) headers.Authorization = `Bearer ${kittycadToken}`
  const fetchOptions: RequestInit = {
    method: 'GET',
    headers,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as GetMlPromptReturn
  return result
}
