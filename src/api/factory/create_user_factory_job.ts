import { File } from '../../models.js'
import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { FactoryJobResponse } from '../../models.js'

interface CreateUserFactoryJobInput {
  client?: Client
  files: File[]
}

type CreateUserFactoryJobReturn = FactoryJobResponse

/**
 * Submit a part for manufacturing. Requires a signed-in Zoo account.
 *
 * The request is `multipart/form-data`: - one JSON part named `body` (`FactoryIntakeForm`) whose `fields` object holds   intake data (material, finish, quantity, notes, …). Material and finish   are required customer-visible catalog names; all other fields are stored   verbatim so they can be added or renamed without an API change. - one or more file parts (any part name). At least one file is required.
 *
 * The submitter's identity (email, name, user id) comes from the authenticated account, not the form.
 *
 * Fetch `GET /user/factory/materials` and `GET /user/factory/finishes`, then send the returned exact `material` and `finish` names. The server rejects missing, non-string, unknown, deleted, and internal-only choices with these stable field-specific `error_code` values: - `factory_material_input_missing` - `factory_material_input_invalid_type` - `factory_material_not_found` - `factory_material_not_customer_visible` - `factory_finish_input_missing` - `factory_finish_input_invalid_type` - `factory_finish_not_found` - `factory_finish_not_customer_visible` - `quantity`: a positive integer.
 *
 * Example `body` part: ```json { "fields": { "material": "6061 Aluminum", "finish": "Anodized", "quantity": 10, "notes": "deburr all edges" } } ```
 *
 * Example request (curl): ``` curl -X POST https://api.zoo.dev/user/factory/jobs \   -H "Authorization: Bearer $ZOO_API_TOKEN" \   -F 'body={"fields":{"material":"6061 Aluminum","finish":"Anodized","quantity":10}};type=application/json' \   -F 'file=@bracket.step' ```
 *
 * Returns `201` with the created job (`FactoryJobResponse`).
 *
 * Tags: factory, hidden
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {File[]} files Files attached as multipart/form-data.
 * @returns {Promise<CreateUserFactoryJobReturn>} successful creation
 *
 * Possible return types: FactoryJobResponse
 */
export default async function create_user_factory_job({
  client,
  files,
}: CreateUserFactoryJobInput): Promise<CreateUserFactoryJobReturn> {
  const path = `/user/factory/jobs`
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
  const result = (await response.json()) as CreateUserFactoryJobReturn
  return result
}
