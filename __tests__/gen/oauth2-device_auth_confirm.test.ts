import { oauth2, Client, ApiError } from '../../src/index.js'

const client = new Client()

async function example() {
  const response = await oauth2.device_auth_confirm({
    body: { user_code: 'The user code.' },
    client,
  })
  return response
}

describe('Testing oauth2.device_auth_confirm', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
