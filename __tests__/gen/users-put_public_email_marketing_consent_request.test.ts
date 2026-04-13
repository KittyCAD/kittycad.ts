import { users, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await users.put_public_email_marketing_consent_request({
    body: { email: 'The email' },
    client,
  })
  return response
}

describe('Testing users.put_public_email_marketing_consent_request', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
