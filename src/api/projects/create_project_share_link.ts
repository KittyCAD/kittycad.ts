import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {
  ProjectShareLinkResponse,
  Uuid,
  CreateProjectShareLinkRequest,
} from '../../models.js'

interface CreateProjectShareLinkInput {
  client?: Client
  id: Uuid
  body: CreateProjectShareLinkRequest
}

type CreateProjectShareLinkReturn = ProjectShareLinkResponse

/**
 * Create a share link for one of the authenticated user's projects.
 *
 * Tags: projects
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The identifier. (path)
 * @property {CreateProjectShareLinkRequest} body Request body payload
 * @returns {Promise<CreateProjectShareLinkReturn>} successful creation
 *
 * Possible return types: ProjectShareLinkResponse
 */
export default async function create_project_share_link({
  client,
  id,
  body,
}: CreateProjectShareLinkInput): Promise<CreateProjectShareLinkReturn> {
  const path = `/user/projects/${id}/share-links`
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
  headers['Content-Type'] = 'application/json'
  const fetchOptions: RequestInit = {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as CreateProjectShareLinkReturn
  return result
}
