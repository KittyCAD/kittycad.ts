import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { CodeOutput, CodeLanguage } from '../../models.js'

interface CreateFileExecutionInput {
  client?: Client
  lang: CodeLanguage
  output?: string
  body: string
}

type CreateFileExecutionReturn = CodeOutput

/**
 * Execute a Zoo program in a specific language.
 *
 * Tags: executor, hidden
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {CodeLanguage} lang The language of the code. (path)
 * @property {string} output The output file we want to get the contents for (the paths are relative to where in litterbox it is being run). You can denote more than one file with a comma separated list of string paths. (query)
 * @property {string} body Request body payload
 * @returns {Promise<CreateFileExecutionReturn>} successful creation
 *
 * Possible return types: CodeOutput
 */
export default async function create_file_execution({
  client,
  lang,
  output,
  body,
}: CreateFileExecutionInput): Promise<CreateFileExecutionReturn> {
  const path = `/file/execute/${lang}`
  const qs = buildQuery({ output: output })
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
  headers['Content-Type'] = 'application/octet-stream'
  const fetchOptions: RequestInit = {
    method: 'POST',
    headers,
    body,
  }
  const _fetch = client?.fetch || fetch
  const response = await _fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as CreateFileExecutionReturn
  return result
}
