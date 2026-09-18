import type { Error } from './models.js'

export class ApiError extends Error {
  status: number
  error_code?: string
  request_id?: string
  body?: Partial<Error>

  constructor(status: number, body?: Partial<Error>, message?: string) {
    super(message || body?.message || `HTTP ${status}`)
    this.name = 'ApiError'
    this.status = status
    this.error_code = body?.error_code
    this.request_id = body?.request_id
    this.body = body
  }
}

export async function throwIfNotOk(res: Response): Promise<void> {
  if (res.ok) return
  let body: Partial<Error> | undefined
  let text: string
  try {
    text = await res.text()
  } catch {
    throw new ApiError(res.status)
  }
  try {
    body = JSON.parse(text) as Partial<Error>
  } catch {
    body = text ? ({ message: text } as Partial<Error>) : undefined
  }
  throw new ApiError(res.status, body)
}
