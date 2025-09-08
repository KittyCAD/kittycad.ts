// Load fetch polyfill dynamically only when needed (older Node),
// and avoid bundlers pulling it into browser builds.
try {
  if (
    typeof fetch === 'undefined' &&
    typeof process !== 'undefined' &&
    (process as unknown as NodeJS.Process).versions?.node
  ) {
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const din = new Function('m', 'return import(m)') as (
      m: string
    ) => Promise<unknown>
    // Fire and forget; Node 18+ already has fetch so this is mostly a no-op.
    void din('cross-fetch/polyfill').catch(() => {})
  }
} catch {
  // ignore if not available
}

export interface ClientOptions {
  token?: string
  baseUrl?: string
  fetch?: typeof fetch
}

export class Client {
  token?: string
  baseUrl?: string
  fetch?: typeof fetch

  constructor(tokenOrOpts?: string | ClientOptions) {
    if (typeof tokenOrOpts === 'string') {
      this.token = tokenOrOpts
    } else if (tokenOrOpts && typeof tokenOrOpts === 'object') {
      this.token = tokenOrOpts.token
      this.baseUrl = tokenOrOpts.baseUrl
      this.fetch = tokenOrOpts.fetch
    }
  }
}

/**
 * Build a URL query string from a map of params, skipping undefined values.
 * Arrays append multiple entries with the same key. Returns '' when empty.
 */
export function buildQuery(params: Record<string, unknown>): string {
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue
    if (Array.isArray(value)) {
      for (const v of value) search.append(key, String(v))
    } else {
      search.append(key, String(value))
    }
  }
  const qs = search.toString()
  return qs ? `?${qs}` : ''
}

// On Windows + Node, load system CAs so TLS works behind enterprise roots.
// This is a no-op on non-Windows platforms and in browsers.
try {
  if (
    typeof process !== 'undefined' &&
    (process as unknown as NodeJS.Process).versions?.node &&
    (process as unknown as NodeJS.Process).platform === 'win32'
  ) {
    // Dynamic import via indirection to avoid Rollup code-splitting.
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const din = new Function('m', 'return import(m)') as (
      m: string
    ) => Promise<unknown>
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    din('win-ca')
  }
} catch {
  // ignore if not available
}
