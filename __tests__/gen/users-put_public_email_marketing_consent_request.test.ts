import { users, ApiError } from '../../src/index.js'

async function example() {
  const response = await users.put_public_email_marketing_consent_request({
    body: { email: 'The email' },
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
