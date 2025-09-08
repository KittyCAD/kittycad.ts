import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {
  KclCodeCompletionResponse,
  KclCodeCompletionRequest,
} from '../../models.js'

interface CreateKclCodeCompletionsInput {
  client?: Client
  body: KclCodeCompletionRequest
}

type CreateKclCodeCompletionsReturn = KclCodeCompletionResponse

/**
 * Generate code completions for KCL.
 *
 * Tags: ml, beta
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {KclCodeCompletionRequest} body Request body payload
 * @returns {Promise<CreateKclCodeCompletionsReturn>} successful creation
 *
 * Possible return types: KclCodeCompletionResponse
 */
export default async function create_kcl_code_completions({
  client,
  body,
}: CreateKclCodeCompletionsInput): Promise<CreateKclCodeCompletionsReturn> {
  const path = `/ml/kcl/completions`
  const qs = buildQuery({})
  const url = path + qs
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
  const headers: Record<string, string> = {}
  if (kittycadToken) headers.Authorization = `Bearer ${kittycadToken}`
  headers['Content-Type'] = 'application/json'
  const fetchOptions: RequestInit = {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as CreateKclCodeCompletionsReturn
  return result
}
