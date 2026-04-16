import { oauth2, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await oauth2.oauth2_token({
    body: {
      client_id: 'The OAuth app client ID.',
      code: 'An auth token. A uuid with a prefix of zoo-oac-',
      code_verifier: 'The PKCE verifier, for `authorization_code`.',
      grant_type: 'authorization_code',
      redirect_uri: 'The redirect URI, for `authorization_code`.',
      refresh_token: 'An auth token. A uuid with a prefix of zoo-rfr-',
    },
    client,
  })
  return response
}

describe('Testing oauth2.oauth2_token', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
