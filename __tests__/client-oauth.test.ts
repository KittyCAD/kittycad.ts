import { afterEach, describe, expect, it, vi } from 'vitest'
import { Client } from '../src/client'

const localStorageStateKey = 'oauth2authcodepkce-state'

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

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('Client OAuth2', () => {
  it('does not touch browser OAuth state until OAuth is used', () => {
    expect(() => new Client({ clientId: 'client-id' })).not.toThrow()
  })

  it('updates the client token after exchanging an authorization code', async () => {
    const storage = new MemoryStorage()
    storage.setItem(
      localStorageStateKey,
      JSON.stringify({
        stage: 0,
        stateQueryParam: 'state-value',
        codeVerifier: 'code-verifier',
      })
    )

    vi.stubGlobal('localStorage', storage)
    vi.stubGlobal('location', {
      href: 'http://localhost:3000/callback?code=auth-code&state=state-value',
      origin: 'http://localhost:3000',
      pathname: '/callback',
    })
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
    expect(fetchSpy).toHaveBeenCalledWith(
      'https://api.zoo.dev/oauth2/token',
      expect.objectContaining({ method: 'POST' })
    )
  })
})
