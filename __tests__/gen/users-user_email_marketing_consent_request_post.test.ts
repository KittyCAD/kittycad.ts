import { users, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await users.user_email_marketing_consent_request_post({
    client,
  })
  return response
}

describe('Testing users.user_email_marketing_consent_request_post', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
