import { Client } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { ConversationResultsPage, CreatedAtSortMode } from '../../models.js'

interface ListConversationsForUserInput {
  client?: Client
  limit: number
  page_token: string
  sort_by: CreatedAtSortMode
}

type ListConversationsForUserReturn = ConversationResultsPage

/**
 * List conversations
 *
 * This endpoint requires authentication by any Zoo user. It returns the conversations for the authenticated user.
 *
 * The conversations are returned in order of creation, with the most recently created conversations first.
 *
 * Tags: ml
 *
 * @param client Optional client with auth token.
 * @param limit Maximum number of items returned by a single call (query)
 * @param page_token Token returned by previous call to retrieve the subsequent page (query)
 * @param sort_by (query)
 * @returns successful operation
 */
export default async function list_conversations_for_user({
  client,
  limit,
  page_token,
  sort_by,
}: ListConversationsForUserInput): Promise<ListConversationsForUserReturn> {
  const url = `/ml/conversations?limit=${limit}&page_token=${page_token}&sort_by=${sort_by}`
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
  const result = (await response.json()) as ListConversationsForUserReturn
  return result
}
