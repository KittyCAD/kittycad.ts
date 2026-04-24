import { payments, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await payments.redirect_payment_method_portal_link_for_org({
    return_url: 'string',
    client,
  })
  return response
}

describe('Testing payments.redirect_payment_method_portal_link_for_org', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
