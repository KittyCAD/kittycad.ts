import { meta, Client, ApiError } from '../../src/index.js'

const client = new Client()

async function example() {
  const response = await meta.get_pricing_subscriptions({ client })
  return response
}

describe('Testing meta.get_pricing_subscriptions', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
