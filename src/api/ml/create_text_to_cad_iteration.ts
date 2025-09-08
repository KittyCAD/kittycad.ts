import { Client } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { TextToCadIteration, TextToCadIterationBody } from '../../models.js'

interface CreateTextToCadIterationInput {
  client?: Client
  body: TextToCadIterationBody
}

type CreateTextToCadIterationReturn = TextToCadIteration

/**
 * Iterate on a CAD model with a prompt.
 *
 * Even if you give specific ranges to edit, the model might change more than just those in order to make the changes you requested without breaking the code.
 *
 * You always get the whole code back, even if you only changed a small part of it.
 *
 * This operation is performed asynchronously, the `id` of the operation will be returned. You can use the `id` returned from the request to get status information about the async operation from the `/async/operations/{id}` endpoint.
 *
 * This endpoint will soon be deprecated in favor of the `/ml/text-to-cad/multi-file/iteration` endpoint. In that the endpoint path will remain but it will have the same behavior as `ml/text-to-cad/multi-file/iteration`.
 *
 * Tags: ml
 *
 * @param client Optional client with auth token.
 * @param body Request body payload
 * @returns successful creation
 */
export default async function create_text_to_cad_iteration({
  client,
  body,
}: CreateTextToCadIterationInput): Promise<CreateTextToCadIterationReturn> {
  const url = `/ml/text-to-cad/iteration`
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
  const result = (await response.json()) as CreateTextToCadIterationReturn
  return result
}
