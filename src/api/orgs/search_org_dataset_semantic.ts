import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { OrgDatasetSemanticSearchMatch, Uuid } from '../../models.js'

interface SearchOrgDatasetSemanticInput {
  client?: Client
  id: Uuid
  q: string
  limit?: number
}

type SearchOrgDatasetSemanticReturn = OrgDatasetSemanticSearchMatch[]

/**
 * Run semantic search across chunked conversion outputs for a dataset.
 *
 * This embeds the query text with the org-dataset embedding model and returns top chunk matches ranked by cosine similarity.
 *
 * Tags: orgs
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The identifier. (path)
 * @property {string} q Natural-language query text to embed and search. (query)
 * @property {number} limit Max number of matching chunks to return.
 *
 * Defaults to 10 and is capped at 100. (query)
 * @returns {Promise<SearchOrgDatasetSemanticReturn>} successful operation
 *
 * Possible return types: OrgDatasetSemanticSearchMatch[]
 */
export default async function search_org_dataset_semantic({
  client,
  id,
  q,
  limit,
}: SearchOrgDatasetSemanticInput): Promise<SearchOrgDatasetSemanticReturn> {
  const path = `/org/datasets/${id}/search/semantic`
  const qs = buildQuery({ q: q, limit: limit })
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
  const result = (await response.json()) as SearchOrgDatasetSemanticReturn
  return result
}
