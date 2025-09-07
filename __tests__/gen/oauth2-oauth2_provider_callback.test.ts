import { ApiError, oauth2 } from '../../src/index.js'

async function example() {
  const response = await oauth2.oauth2_provider_callback({
    provider: 'apple',
    code: 'string',
    id_token: 'string',
    state: 'string',
    user: 'string',
  })
  return response
}

describe('Testing oauth2.oauth2_provider_callback', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
