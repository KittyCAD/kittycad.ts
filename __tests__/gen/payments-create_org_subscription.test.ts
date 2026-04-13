import { payments, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await payments.create_org_subscription({
    body: {
      modeling_app: 'Slug of the modeling app subscription tier requested.',
      pay_annually: true,
    },
    client,
  })
  return response
}

describe('Testing payments.create_org_subscription', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
