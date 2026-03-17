import { store, Client, ApiError } from '../../src/index.js'

const client = new Client()

async function example() {
  const response = await store.create_store_coupon({
    body: { percent_off: 7 },
    client,
  })
  return response
}

describe('Testing store.create_store_coupon', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
