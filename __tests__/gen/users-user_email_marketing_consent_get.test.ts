import { users, ApiError } from '../../src/index.js'

async function example() {
  const response = await users.user_email_marketing_consent_get()
  return response
}

describe('Testing users.user_email_marketing_consent_get', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
