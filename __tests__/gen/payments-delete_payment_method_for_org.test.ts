import { payments, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await payments.delete_payment_method_for_org({
    id: 'string',
    client,
  })
  return response
}

describe('Testing payments.delete_payment_method_for_org', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
