import type { Error } from './models.js'

export class ApiError extends Error {
  status: number
  error_code?: string
  request_id?: string
  body?: Partial<Error>
  retryAfterMs?: number

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
  const error = new ApiError(res.status)
  error.retryAfterMs = retryAfterDelayMs(res.headers.get('Retry-After'))
  let body: Partial<Error> | undefined
  let text: string
  try {
    text = await res.text()
  } catch (cause) {
    error.message = `Failed to read HTTP ${res.status} error response body.`
    error.cause = cause
    throw error
  }
  try {
    body = JSON.parse(text) as Partial<Error>
  } catch {
    body = text ? ({ message: text } as Partial<Error>) : undefined
  }
  error.body = body
  error.message = body?.message || error.message
  error.error_code = body?.error_code
  error.request_id = body?.request_id
  throw error
}

function retryAfterDelayMs(value: string | null): number | undefined {
  if (!value?.trim()) return undefined
  const seconds = Number(value)
  if (Number.isFinite(seconds)) return seconds >= 0 ? seconds * 1000 : undefined
  const date = Date.parse(value)
  return Number.isNaN(date) ? undefined : Math.max(0, date - Date.now())
}
