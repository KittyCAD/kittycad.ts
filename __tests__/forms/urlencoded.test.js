import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { oauth2 } from '../../src/index.ts'

function makeRes(body) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}

describe('application/x-www-form-urlencoded bodies', () => {
  const originalFetch = globalThis.fetch
  beforeEach(() => {
    vi.restoreAllMocks()
  })
  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  it('encodes form data and omits undefined', async () => {
    const mock = vi.fn((url, opts) => makeRes({ ok: true }))
    globalThis.fetch = mock

    await oauth2.device_access_token({
      body: {
        client_id: '00000000-0000-0000-0000-000000000000',
        device_code: '11111111-1111-1111-1111-111111111111',
        grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
      },
    })

    expect(mock).toHaveBeenCalledTimes(1)
    const [, opts] = mock.mock.calls[0]
    expect(opts.method).toBe('POST')
    expect(String(opts.headers['Content-Type'])).toContain(
      'application/x-www-form-urlencoded'
    )
    const bodyStr = opts.body && opts.body.toString ? opts.body.toString() : ''
    expect(bodyStr).toContain('client_id=00000000-0000-0000-0000-000000000000')
    expect(bodyStr).toContain(
      'device_code=11111111-1111-1111-1111-111111111111'
    )
    expect(bodyStr).toContain(
      'grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Adevice_code'
    )
    expect(bodyStr).not.toContain('undefined')
  })
})
