import { payments, ApiError } from '../../src/index.js'

async function example() {
  const response = await payments.update_org_subscription_for_any_org({
    id: '00000000-0000-0000-0000-000000000000',
    body: {
      modeling_app: 'Slug of the modeling app subscription tier requested.',
      pay_annually: true,
    },
  })
  return response
}

describe('Testing payments.update_org_subscription_for_any_org', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
