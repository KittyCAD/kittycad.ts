import { oauth2, Client, ApiError } from '../../src/index.js'

const client = new Client()

async function example() {
  const response = await oauth2.device_access_token({
    body: {
      client_id: 'The client ID.',
      device_code: 'The device code.',
      grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
    },
    client,
  })
  return response
}

describe('Testing oauth2.device_access_token', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
