import { describe, it, expect, vi } from 'vitest'
import { Client, meta } from '../src/index.ts'

function makeRes(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

describe('Client fetch injection', () => {
  it('uses injected fetch and baseUrl', async () => {
    const spy = vi.fn(async (url, init) => {
      expect(String(url)).toBe('https://example.test/ping')
      expect(init?.method).toBe('GET')
      return makeRes({ message: 'pong' })
    })

    const client = new Client({
      token: 't',
      baseUrl: 'https://example.test',
      fetch: spy,
    })
    const res = await meta.ping({ client })
    expect(res.message).toBe('pong')
    expect(spy).toHaveBeenCalledOnce()
  })
})
