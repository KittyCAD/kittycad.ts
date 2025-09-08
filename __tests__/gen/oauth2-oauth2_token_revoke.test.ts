import { oauth2, ApiError } from '../../src/index.js'

async function example() {
  const response = await oauth2.oauth2_token_revoke({
    body: {
      client_id: 'The client ID.',
      client_secret: 'The client secret.',
      token: 'An auth token. A uuid with a prefix of dev-',
    },
  })
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
