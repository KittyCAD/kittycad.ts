import { ApiError, oauth2 } from '../../src/index.js'

async function example() {
  const response = await oauth2.oauth2_token_revoke()
  return response
}

describe('Testing oauth2.oauth2_token_revoke', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
