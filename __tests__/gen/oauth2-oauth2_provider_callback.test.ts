import { oauth2, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await oauth2.oauth2_provider_callback({
    provider: 'apple',
    code: 'string',
    state: 'string',
    id_token: 'string',
    user: 'string',
    client,
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
