import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { WebsiteCadUserInfoForm } from '../../models.js'

interface GetUserCadUserInfoFormInput {
  client?: Client
}

type GetUserCadUserInfoFormReturn = WebsiteCadUserInfoForm

/**
 * Gets authenticated CAD user info form data for the current user.
 *
 * Tags: users
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @returns {Promise<GetUserCadUserInfoFormReturn>} successful operation
 *
 * Possible return types: WebsiteCadUserInfoForm
 */
export default async function get_user_cad_user_info_form(
  { client }: GetUserCadUserInfoFormInput = {} as GetUserCadUserInfoFormInput
): Promise<GetUserCadUserInfoFormReturn> {
  const path = `/user/cad-user-info`
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
  const fetchOptions: RequestInit = {
    method: 'GET',
    headers,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as GetUserCadUserInfoFormReturn
  return result
}
