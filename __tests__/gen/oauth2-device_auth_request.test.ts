import { oauth2, ApiError } from '../../src/index.js'

async function example() {
  const response = await oauth2.device_auth_request({
    body: { client_id: 'The client ID.' },
  })
  return response
}

describe('Testing oauth2.device_auth_request', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
