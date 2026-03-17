import { payments, Client, ApiError } from '../../src/index.js'

const client = new Client()

async function example() {
  const response = await payments.create_payment_intent_for_user({ client })
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
