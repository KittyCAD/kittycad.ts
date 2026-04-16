import { oauth2, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await oauth2.oauth2_token_revoke({
    body: {
      client_id: 'The client ID.',
      client_secret: 'The client secret.',
      token: 'The token to revoke.',
    },
    client,
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
