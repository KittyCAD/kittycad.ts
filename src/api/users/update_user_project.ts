import { File } from '../../models.js'
import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { ProjectResponse, Uuid } from '../../models.js'

interface UpdateUserProjectInput {
  client?: Client
  files: File[]
  id: Uuid
}

type UpdateUserProjectReturn = ProjectResponse

/**
 * Replace one of the authenticated user's projects.
 *
 * Tags: users
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} id The identifier. (path)
 * @property {File[]} files Files attached as multipart/form-data.
 * @returns {Promise<UpdateUserProjectReturn>} successful operation
 *
 * Possible return types: ProjectResponse
 */
export default async function update_user_project({
  client,
  files,
  id,
}: UpdateUserProjectInput): Promise<UpdateUserProjectReturn> {
  const path = `/user/projects/${id}`
  const qs = buildQuery({})
  const url = path + qs
  // Backwards compatible for the BASE_URL env variable
  // That used to exist in only this lib, ZOO_HOST exists in the all the other
  // sdks and the CLI.
  const urlBase = client?.baseUrl || 'https://api.zoo.dev'
  const fullUrl = urlBase + url
  // The other sdks use to use KITTYCAD_API_TOKEN, now they still do for
  // backwards compatibility, but the new standard is ZOO_API_TOKEN.
  // For some reason only this lib supported KITTYCAD_TOKEN, so we need to
  // check for that as well.
  const kittycadToken = client ? client.token || '' : ''
  const headers: Record<string, string> = {}
  if (kittycadToken) headers.Authorization = `Bearer ${kittycadToken}`

  const formData = new FormData()
  files.forEach((file) => {
    formData.append(file.name, file.data, file.name)
  })

  const fetchOptions: RequestInit = {
    method: 'PUT',
    headers,
    body: formData,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as UpdateUserProjectReturn
  return result
}
