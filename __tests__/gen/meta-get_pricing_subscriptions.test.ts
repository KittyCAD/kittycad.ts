import { meta, ApiError } from '../../src/index.js'

async function example() {
  const response = await meta.get_pricing_subscriptions()
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
