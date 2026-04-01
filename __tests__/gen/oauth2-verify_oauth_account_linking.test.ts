import { oauth2, Client, ApiError } from '../../src/index.js'

const client = new Client()

async function example() {
  const response = await oauth2.verify_oauth_account_linking({
    token: 'string',
    callback_url: 'string',
    client,
  })
  return response
}

describe('Testing oauth2.verify_oauth_account_linking', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
