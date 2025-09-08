import { File } from '../../models.js'
import { Client } from '../../client.js'
import { throwIfNotOk } from '../../errors.js'

import { Event } from '../../models.js'

interface CreateEventInput {
  client?: Client
  files: File[]
  body: Event
}

type CreateEventReturn = unknown

export default async function create_event({
  client,
  files,
  body,
}: CreateEventInput): Promise<CreateEventReturn> {
  const url = `/events`
  // Backwards compatible for the BASE_URL env variable
  // That used to exist in only this lib, ZOO_HOST exists in the all the other
  // sdks and the CLI.
  const urlBase =
    process?.env?.ZOO_HOST || process?.env?.BASE_URL || 'https://api.zoo.dev'
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
  const headers: Record<string, string> = {
    'Content-Type': 'multipart/form-data',
  }
  if (kittycadToken) headers.Authorization = `Bearer ${kittycadToken}`

  const formData = new FormData()
  files.forEach((file) => {
    formData.append(file.name, file.data, file.name)
  })
  formData.append('event', JSON.stringify(body))

  const fetchOptions: RequestInit = {
    method: 'POST',
    headers,
    body: formData,
  }
  const response = await fetch(fullUrl, fetchOptions)
  await throwIfNotOk(response)
  const result = (await response.json()) as CreateEventReturn
  return result
}
