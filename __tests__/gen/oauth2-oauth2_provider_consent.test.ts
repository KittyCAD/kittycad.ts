import { oauth2, ApiError } from '../../src/index.js'

async function example() {
  const response = await oauth2.oauth2_provider_consent({
    provider: 'apple',
    callback_url: 'string',
  })
  return response
}

describe('Testing oauth2.oauth2_provider_consent', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
