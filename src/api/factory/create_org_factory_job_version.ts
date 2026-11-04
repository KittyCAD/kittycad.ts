import { File } from '../../models.js'
import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { FactoryJobResponse, Uuid } from '../../models.js'

interface CreateOrgFactoryJobVersionInput {
  client?: Client
  files: File[]
  job_id: Uuid
}

type CreateOrgFactoryJobVersionReturn = FactoryJobResponse

/**
 * Submit a complete new revision as a current human member of the owning organization.
 *
 * Tags: factory
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {Uuid} job_id The requested job's identifier. (path)
 * @property {File[]} files Files attached as multipart/form-data.
 * @returns {Promise<CreateOrgFactoryJobVersionReturn>} successful creation
 *
 * Possible return types: FactoryJobResponse
 */
export default async function create_org_factory_job_version({
  client,
  files,
  job_id,
}: CreateOrgFactoryJobVersionInput): Promise<CreateOrgFactoryJobVersionReturn> {
  const path = `/org/factory/jobs/${job_id}/versions`
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
    method: 'POST',
    headers,
    body: formData,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as CreateOrgFactoryJobVersionReturn
  return result
}
