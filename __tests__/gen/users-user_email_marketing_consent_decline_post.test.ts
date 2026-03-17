import { users, Client, ApiError } from '../../src/index.js'

const client = new Client()

async function example() {
  const response = await users.user_email_marketing_consent_decline_post({
    client,
  })
  return response
}

describe('Testing users.user_email_marketing_consent_decline_post', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
