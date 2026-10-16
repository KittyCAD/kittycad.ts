import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import {
  ProjectLibraryResponse,
  CreateProjectLibraryRequest,
} from '../../models.js'

interface CreateProjectLibraryInput {
  client?: Client
  body: CreateProjectLibraryRequest
}

type CreateProjectLibraryReturn = ProjectLibraryResponse

/**
 * Create a personal library or a library owned by the active organization.
 *
 * Tags: projects
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {CreateProjectLibraryRequest} body Request body payload
 * @returns {Promise<CreateProjectLibraryReturn>} successful creation
 *
 * Possible return types: ProjectLibraryResponse
 */
export default async function create_project_library({
  client,
  body,
}: CreateProjectLibraryInput): Promise<CreateProjectLibraryReturn> {
  const path = `/user/project-libraries`
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
  const result = (await response.json()) as CreateProjectLibraryReturn
  return result
}
