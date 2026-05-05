import {
  type AccessContext,
  type ObjStringDict,
  OAuth2AuthCodePKCE,
} from '@kittycad/oauth2-auth-code-pkce'

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
  clientId?: string
  redirectUrl?: string
  scopes?: string[]
  onAccessTokenExpiry?: (
    refreshAccessToken: () => Promise<AccessContext>
  ) => Promise<AccessContext>
  onInvalidGrant?: (refreshAuthCodeOrRefreshToken: () => Promise<void>) => void
}

export class Client {
  token?: string
  baseUrl?: string
  fetch?: typeof fetch
  clientId?: string
  redirectUrl?: string
  scopes?: string[]
  onAccessTokenExpiry?: (
    refreshAccessToken: () => Promise<AccessContext>
  ) => Promise<AccessContext>
  onInvalidGrant?: (refreshAuthCodeOrRefreshToken: () => Promise<void>) => void

  private oauth2?: OAuth2AuthCodePKCE

  constructor(tokenOrOpts?: string | ClientOptions) {
    const env = typeof process !== 'undefined' ? process.env : undefined

    const envToken =
      env?.KITTYCAD_TOKEN || env?.KITTYCAD_API_TOKEN || env?.ZOO_AI_TOKEN
    const envHost = env?.ZOO_HOST

    if (typeof tokenOrOpts === 'string') {
      this.token = tokenOrOpts
    } else if (tokenOrOpts && typeof tokenOrOpts === 'object') {
      this.token = tokenOrOpts.token
      this.baseUrl = tokenOrOpts.baseUrl
      this.fetch = tokenOrOpts.fetch
      this.clientId = tokenOrOpts.clientId
      this.redirectUrl = tokenOrOpts.redirectUrl
      this.scopes = tokenOrOpts.scopes
      this.onAccessTokenExpiry = tokenOrOpts.onAccessTokenExpiry
      this.onInvalidGrant = tokenOrOpts.onInvalidGrant
    }

    this.token ??= envToken
    this.baseUrl ??= envHost

    if (this.clientId) {
      if (typeof localStorage !== 'undefined') {
        this.oauth2 = this.createOAuth2Client()
        this.oauth2.isHTTPDecoratorActive(true)
        this.fetch = this.oauth2.decorateFetchHTTPClient(
          this.fetch || fetch
        ) as typeof fetch
      }
    }
  }

  authorize(oneTimeParams?: ObjStringDict): Promise<void> {
    return this.oauth2!.fetchAuthorizationCode(oneTimeParams)
  }

  isReturningFromAuthServer(): Promise<boolean> {
    return this.oauth2!.isReturningFromAuthServer()
  }

  async getAccessToken(): Promise<AccessContext | undefined> {
    const context = await this.oauth2!.getAccessToken()
    this.updateTokenFromAccessContext(context)
    return context
  }

  resetOAuth2(): void {
    this.oauth2!.reset()
    this.token = undefined
  }

  private createOAuth2Client(): OAuth2AuthCodePKCE {
    const baseUrl = this.baseUrl || 'https://api.zoo.dev'
    const redirectUrl = this.redirectUrl || getCurrentUrlWithoutSearch()

    if (!redirectUrl) {
      throw new Error(
        'OAuth2 requires redirectUrl when the current browser URL is unavailable.'
      )
    }

    return new OAuth2AuthCodePKCE({
      authorizationUrl: joinUrl(baseUrl, '/oauth2/authorize'),
      tokenUrl: joinUrl(baseUrl, '/oauth2/token'),
      clientId: this.clientId,
      redirectUrl,
      scopes: this.scopes || [],
      onAccessTokenExpiry: async (refreshAccessToken) => {
        const context = await (this.onAccessTokenExpiry
          ? this.onAccessTokenExpiry(refreshAccessToken)
          : refreshAccessToken())
        this.updateTokenFromAccessContext(context)
        return context
      },
      onInvalidGrant: this.onInvalidGrant || (() => {}),
    })
  }

  private updateTokenFromAccessContext(
    context: AccessContext | undefined
  ): void {
    if (context?.token?.value) this.token = context.token.value
  }
}

function getCurrentUrlWithoutSearch(): string | undefined {
  if (typeof location === 'undefined') return undefined
  return `${location.origin}${location.pathname}`
}

function joinUrl(baseUrl: string, path: string): string {
  return `${baseUrl.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`
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

/**
 * Build an application/x-www-form-urlencoded body from a params map,
 * skipping undefined and expanding arrays as repeated keys.
 */
export function buildForm(params: Record<string, unknown>): URLSearchParams {
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params || {})) {
    if (value === undefined) continue
    if (Array.isArray(value)) {
      for (const v of value) search.append(key, String(v))
    } else {
      search.append(key, String(value))
    }
  }
  return search
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
