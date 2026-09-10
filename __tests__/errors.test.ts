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
