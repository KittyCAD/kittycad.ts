import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { Uuid } from '../../models.js'

interface DeleteOrgDatasetInput {
  client?: Client
  id: Uuid
}

type DeleteOrgDatasetReturn = void

/**
 * Delete a dataset owned by the caller's organization.
 *
 * This is a destructive operation that: - requires org admin authentication and the dataset must belong to the caller's org. - fails with a 409 Conflict if the dataset is still attached to any custom model. - deletes Zoo-managed artifacts for this dataset (converted outputs and embeddings). - does **not** delete or modify the customer's source bucket/prefix.
 *
 * All internal artifact deletions are strict; if any cleanup fails, the request fails.
 *
 * Tags: orgs
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The identifier. (path)
 * @returns {Promise<DeleteOrgDatasetReturn>} successful deletion
 */
export default async function delete_org_dataset({
  client,
  id,
}: DeleteOrgDatasetInput): Promise<DeleteOrgDatasetReturn> {
  const path = `/org/datasets/${id}`
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
  const fetchOptions: RequestInit = {
    method: 'DELETE',
    headers,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  return undefined as DeleteOrgDatasetReturn
}
