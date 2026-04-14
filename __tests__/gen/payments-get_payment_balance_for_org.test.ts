import { payments, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await payments.get_payment_balance_for_org({
    include_total_due: true,
    client,
  })
  return response
}

describe('Testing payments.get_payment_balance_for_org', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
