import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'
import { Pager, createPager } from '../../pagination.js'

import {
  TextToCadResponseResultsPage,
  CreatedAtSortMode,
  Uuid,
  TextToCadResponse,
} from '../../models.js'

interface ListTextToCadPartsForUserInput {
  client?: Client
  limit?: number
  page_token?: string
  sort_by?: CreatedAtSortMode
  conversation_id?: Uuid
  no_models?: boolean
}

type ListTextToCadPartsForUserReturn = TextToCadResponseResultsPage

/**
 * List text-to-CAD parts you've generated.
 *
 * This will always return the STEP file contents as well as the format the user originally requested.
 *
 * This endpoint requires authentication by any Zoo user. It returns the text-to-CAD parts for the authenticated user.
 *
 * The text-to-CAD parts are returned in order of creation, with the most recently created text-to-CAD parts first.
 *
 * Tags: ml
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {number} limit Maximum number of items returned by a single call (query)
 * @property {string} page_token Token returned by previous call to retrieve the subsequent page (query)
 * @property {CreatedAtSortMode} sort_by (query)
 * @property {Uuid} conversation_id If specified, only return the prompts for the conversation id given. (query)
 * @property {boolean} no_models If we should return the part contents or just the metadata. (query)
 * @returns {Promise<ListTextToCadPartsForUserReturn>} successful operation
 *
 * Possible return types: TextToCadResponseResultsPage
 */
export default async function list_text_to_cad_parts_for_user({
  client,
  limit,
  page_token,
  sort_by,
  conversation_id,
  no_models,
}: ListTextToCadPartsForUserInput): Promise<ListTextToCadPartsForUserReturn> {
  const path = `/user/text-to-cad`
  const qs = buildQuery({
    limit: limit,
    page_token: page_token,
    sort_by: sort_by,
    conversation_id: conversation_id,
    no_models: no_models,
  })
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
  const fetchOptions: RequestInit = {
    method: 'GET',
    headers,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as ListTextToCadPartsForUserReturn
  return result
}

export function list_text_to_cad_parts_for_user_pager(
  params: ListTextToCadPartsForUserInput
): Pager<
  ListTextToCadPartsForUserInput,
  ListTextToCadPartsForUserReturn,
  TextToCadResponse
> {
  return createPager<
    ListTextToCadPartsForUserInput,
    ListTextToCadPartsForUserReturn,
    TextToCadResponse
  >(list_text_to_cad_parts_for_user, params, 'page_token')
}
