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
    this.error_code = (body as any)?.error_code
    this.request_id = (body as any)?.request_id
    this.body = body
  }
}

export async function throwIfNotOk(res: Response): Promise<void> {
  if (res.ok) return
  let body: Partial<Error> | undefined
  try {
    body = (await res.json()) as Partial<Error>
  } catch {
    try {
      const text = await res.text()
      body = text ? ({ message: text } as Partial<Error>) : undefined
    } catch {
      body = undefined
    }
  }
  throw new ApiError(res.status, body)
}
