import type { Error_type } from './models.js';

export class ApiError extends Error {
  status: number;
  error_code?: string;
  request_id?: string;
  body?: Partial<Error_type> | any;

  constructor(
    status: number,
    body?: Partial<Error_type> | any,
    message?: string,
  ) {
    super(message || body?.message || `HTTP ${status}`);
    this.name = 'ApiError';
    this.status = status;
    this.error_code = (body as any)?.error_code;
    this.request_id = (body as any)?.request_id;
    this.body = body;
  }
}

export async function throwIfNotOk(res: Response) {
  if (res.ok) return;
  let body: any;
  try {
    body = await res.json();
  } catch {
    try {
      const text = await res.text();
      body = text ? { message: text } : undefined;
    } catch {
      body = undefined;
    }
  }
  throw new ApiError(res.status, body);
}
