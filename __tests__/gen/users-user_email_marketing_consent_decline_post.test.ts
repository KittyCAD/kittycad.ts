import { users, ApiError } from '../../src/index.js'

async function example() {
  const response = await users.user_email_marketing_consent_decline_post()
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
