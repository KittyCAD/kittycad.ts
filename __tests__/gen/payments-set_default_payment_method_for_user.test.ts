import { payments, ApiError } from '../../src/index.js'

async function example() {
  const response = await payments.set_default_payment_method_for_user({
    id: 'string',
  })
  return response
}

describe('Testing payments.set_default_payment_method_for_user', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
