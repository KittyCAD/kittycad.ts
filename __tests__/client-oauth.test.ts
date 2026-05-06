import { afterEach, describe, expect, it, vi } from 'vitest'
import { Client } from '../src/client'
import type { ClientOptions } from '../src/client'
import type { AccessContext } from '@kittycad/oauth2-auth-code-pkce'

const { oauth2Instances, MockOAuth2AuthCodePKCE } = vi.hoisted(() => {
  const oauth2Instances: MockOAuth2AuthCodePKCE[] = []

  class MockOAuth2AuthCodePKCE {
    isHTTPDecoratorActive = vi.fn()
    decorateFetchHTTPClient = vi.fn((fetchClient: typeof fetch) => fetchClient)
    fetchAuthorizationCode = vi.fn()
    isReturningFromAuthServer = vi.fn(async () => true)
    getAccessToken = vi.fn(async () => ({
      token: { value: 'access-token', expiry: '2026-01-01T00:00:00.000Z' },
    }))
    reset = vi.fn()

    constructor(
      public config: {
        authorizationUrl: string
        tokenUrl: string
        clientId?: string
        redirectUrl: string
        scopes: string[]
        onAccessTokenExpiry: (
          refreshAccessToken: () => Promise<AccessContext>
        ) => Promise<AccessContext>
        onInvalidGrant: () => void
      }
    ) {
      oauth2Instances.push(this)
    }
  }

  return { oauth2Instances, MockOAuth2AuthCodePKCE }
})

class MemoryStorage {
  private values = new Map<string, string>()

  getItem(key: string) {
    return this.values.get(key) ?? null
  }

  setItem(key: string, value: string) {
    this.values.set(key, value)
  }

  removeItem(key: string) {
    this.values.delete(key)
  }

  clear() {
    this.values.clear()
  }
}

vi.mock('@kittycad/oauth2-auth-code-pkce', () => ({
  OAuth2AuthCodePKCE: MockOAuth2AuthCodePKCE,
}))

afterEach(() => {
  vi.unstubAllGlobals()
  oauth2Instances.length = 0
})

describe('Client OAuth2', () => {
  it('does not touch browser OAuth state until OAuth is used', () => {
    expect(() => new Client({ clientId: 'client-id' })).not.toThrow()
  })

  it('updates the client token after exchanging an authorization code', async () => {
    vi.stubGlobal('localStorage', new MemoryStorage())
    const fetchSpy = vi.fn(
      async () =>
        new Response(
          JSON.stringify({
            access_token: 'access-token',
            expires_in: 3600,
            refresh_token: 'refresh-token',
            scope: 'modeling',
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }
        )
    )
    vi.stubGlobal('fetch', fetchSpy)

    const client = new Client({
      baseUrl: 'https://api.zoo.dev/',
      clientId: 'client-id',
      redirectUrl: 'http://localhost:3000/callback',
    })

    await expect(client.isReturningFromAuthServer()).resolves.toBe(true)
    await client.getAccessToken()

    expect(client.token).toBe('access-token')
    expect(oauth2Instances).toHaveLength(1)
    expect(oauth2Instances[0].config).toEqual(
      expect.objectContaining({
        authorizationUrl: 'https://api.zoo.dev/oauth2/authorize',
        tokenUrl: 'https://api.zoo.dev/oauth2/token',
        clientId: 'client-id',
        redirectUrl: 'http://localhost:3000/callback',
      })
    )
    expect(oauth2Instances[0].decorateFetchHTTPClient).toHaveBeenCalledWith(
      fetchSpy
    )
  })

  it('updates the client token when OAuth refreshes an expired access token', async () => {
    vi.stubGlobal('localStorage', new MemoryStorage())
    const refreshAccessToken = vi.fn(async () => ({
      token: {
        value: 'refreshed-access-token',
        expiry: '2026-01-01T00:00:00.000Z',
      },
    }))
    const onAccessTokenExpiry: ClientOptions['onAccessTokenExpiry'] = vi.fn(
      async (refresh) => refresh()
    )

    const client = new Client({
      clientId: 'client-id',
      redirectUrl: 'http://localhost:3000/callback',
      onAccessTokenExpiry,
    })

    await oauth2Instances[0].config.onAccessTokenExpiry(refreshAccessToken)

    expect(refreshAccessToken).toHaveBeenCalled()
    expect(onAccessTokenExpiry).toHaveBeenCalledWith(refreshAccessToken)
    expect(client.token).toBe('refreshed-access-token')
  })
})
