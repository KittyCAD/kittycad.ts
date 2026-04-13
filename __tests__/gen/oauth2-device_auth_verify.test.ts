import { oauth2, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await oauth2.device_auth_verify({
    user_code: 'string',
    app_name: 'string',
    client,
  })
  return response
}

describe('Testing oauth2.device_auth_verify', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
