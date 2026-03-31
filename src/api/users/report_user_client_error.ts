import { Client, buildQuery } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { ClientErrorReportAccepted, ClientErrorReport } from '../../models.js'

interface ReportUserClientErrorInput {
  client?: Client
  body: ClientErrorReport
}

type ReportUserClientErrorReturn = ClientErrorReportAccepted

/**
 * Report a client-originated error.
 *
 * This endpoint requires authentication by any Zoo user. It accepts a structured client error payload and writes it to the server logs for triage.
 *
 * Tags: users
 *
 * @param params Function parameters.
 * @property {Client} [client] Optional client with auth token.
 * @property {ClientErrorReport} body Request body payload
 * @returns {Promise<ReportUserClientErrorReturn>} successfully enqueued operation
 *
 * Possible return types: ClientErrorReportAccepted
 */
export default async function report_user_client_error({
  client,
  body,
}: ReportUserClientErrorInput): Promise<ReportUserClientErrorReturn> {
  const path = `/user/client-errors`
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
  const result = (await response.json()) as ReportUserClientErrorReturn
  return result
}
