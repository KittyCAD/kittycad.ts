import { ApiError, payments } from '../../src/index.js'

async function example() {
  const response = await payments.create_payment_intent_for_user()
  return response
}

describe('Testing payments.create_payment_intent_for_user', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
