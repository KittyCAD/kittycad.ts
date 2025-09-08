import { Client } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { MlFeedback } from '../../models.js'

interface CreateTextToCadModelFeedbackInput {
  client?: Client
  id: string
  feedback: MlFeedback
}

type CreateTextToCadModelFeedbackReturn = unknown

/**
 * Give feedback to a specific ML response.
 *
 * This can be a text-to-CAD creation or iteration.
 *
 * This endpoint requires authentication by any Zoo user. The user must be the owner of the ML response, in order to give feedback.
 *
 * Tags: ml
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {string} id The id of the model to give feedback to. (path)
 * @property {MlFeedback} feedback The feedback. (query)
 * @returns {Promise<CreateTextToCadModelFeedbackReturn>} resource updated
 */
export default async function create_text_to_cad_model_feedback({
  client,
  id,
  feedback,
}: CreateTextToCadModelFeedbackInput): Promise<CreateTextToCadModelFeedbackReturn> {
  const url = `/user/text-to-cad/${id}?feedback=${feedback}`
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
    method: 'POST',
    headers,
  }
  const response = await fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as CreateTextToCadModelFeedbackReturn
  return result
}
