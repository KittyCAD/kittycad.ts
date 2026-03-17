import { payments, Client, ApiError } from '../../src/index.js'

const client = new Client()

async function example() {
  const response = await payments.set_default_payment_method_for_user({
    id: 'string',
    client,
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
