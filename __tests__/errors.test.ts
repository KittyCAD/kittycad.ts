import { vi } from 'vitest'
import { throwIfNotOk } from '../src/errors'

describe('throwIfNotOk', () => {
  it('preserves a non-JSON error response body', async () => {
    const response = new Response('upstream exploded', { status: 502 })

    await expect(throwIfNotOk(response)).rejects.toMatchObject({
      status: 502,
      message: 'upstream exploded',
      body: { message: 'upstream exploded' },
    })
  })
})

describe('Retry-After', () => {
  afterEach(() => vi.useRealTimers())

  it.each([
    ['7', 7000],
    ['0', 0],
    ['1.5', 1500],
    ['-1', undefined],
    ['', undefined],
    ['garbage', undefined],
  ])('preserves delay %j as %j milliseconds', async (header, retryAfterMs) => {
    await expect(
      throwIfNotOk(
        new Response('Slow down', {
          status: 429,
          headers: { 'Retry-After': header },
        })
      )
    ).rejects.toMatchObject({ status: 429, message: 'Slow down', retryAfterMs })
  })

  it.each([
    ['Thu, 05 Nov 2026 12:00:07 GMT', 7000],
    ['Thu, 05 Nov 2026 11:59:59 GMT', 0],
  ])(
    'handles HTTP dates and clamps expired delays',
    async (header, retryAfterMs) => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2026-11-05T12:00:00Z'))
      await expect(
        throwIfNotOk(
          new Response('{}', {
            status: 503,
            headers: { 'Retry-After': header },
          })
        )
      ).rejects.toMatchObject({ status: 503, retryAfterMs })
    }
  )
})
