import { oauth2, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await oauth2.oauth2_authorize({
    response_type: 'code',
    client_id: 'string',
    redirect_uri: 'string',
    state: 'string',
    code_challenge: 'string',
    code_challenge_method: 'PLAIN',
    client,
  })
  return response
}

describe('Testing oauth2.oauth2_authorize', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
