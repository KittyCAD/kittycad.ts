import { payments, ApiError } from '../../src/index.js'

async function example() {
  const response = await payments.upsert_subscription_plan_price({
    slug: 'string',
    body: {
      active: true,
      billing_model: 'flat',
      cadence: 'day',
      unit_amount: 7,
    },
  })
  return response
}

describe('Testing payments.upsert_subscription_plan_price', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
