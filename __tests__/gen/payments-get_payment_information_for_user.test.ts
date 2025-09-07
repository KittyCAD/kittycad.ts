import { payments, ApiError } from '../../src/index.js'

async function example() {
  const response = await payments.get_payment_information_for_user()
  return response
}

describe('Testing payments.get_payment_information_for_user', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
