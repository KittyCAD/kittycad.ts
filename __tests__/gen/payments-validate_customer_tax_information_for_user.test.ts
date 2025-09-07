import { ApiError, payments } from '../../src/index.js'

async function example() {
  const response = await payments.validate_customer_tax_information_for_user()
  return response
}

describe('Testing payments.validate_customer_tax_information_for_user', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
