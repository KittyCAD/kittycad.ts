import { payments, Client, ApiError } from '../../src/index.js'

const client = new Client()

async function example() {
  const response = await payments.get_payment_balance_for_any_org({
    include_total_due: true,
    id: '00000000-0000-0000-0000-000000000000',
    client,
  })
  return response
}

describe('Testing payments.get_payment_balance_for_any_org', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
