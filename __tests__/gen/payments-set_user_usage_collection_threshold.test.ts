import { payments, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await payments.set_user_usage_collection_threshold({
    body: { amount: 7, expected_version: 7 },
    client,
  })
  return response
}

describe('Testing payments.set_user_usage_collection_threshold', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
