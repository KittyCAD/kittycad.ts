import { factory, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await factory.accept_user_factory_quote({
    job_id: '00000000-0000-0000-0000-000000000000',
    quote_id: '00000000-0000-0000-0000-000000000000',
    payment_attempt_id: '00000000-0000-0000-0000-000000000000',
    use_credits: true,
    max_amount_due_cents: 7,
    client,
  })
  return response
}

describe('Testing factory.accept_user_factory_quote', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
