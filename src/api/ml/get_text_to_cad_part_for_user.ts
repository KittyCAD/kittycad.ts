import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { TextToCadResponse } from '../../models.js'

interface GetTextToCadPartForUserInput {
  client?: Client
  id: string
}

type GetTextToCadPartForUserReturn = TextToCadResponse

/**
 * Get a text-to-CAD response.
 *
 * This endpoint requires authentication by any Zoo user. The user must be the owner of the text-to-CAD model.
 *
 * Tags: ml
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {string} id The id of the model to give feedback to. (path)
 * @returns {Promise<GetTextToCadPartForUserReturn>} successful operation
 *
 * Possible return types: TextToCadResponse
 */
export default async function get_text_to_cad_part_for_user({
  client,
  id,
}: GetTextToCadPartForUserInput): Promise<GetTextToCadPartForUserReturn> {
  const path = `/user/text-to-cad/${id}`
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
  const result = (await response.json()) as GetTextToCadPartForUserReturn
  return result
}
