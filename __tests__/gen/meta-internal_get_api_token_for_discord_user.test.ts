import { meta, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await meta.internal_get_api_token_for_discord_user({
    discord_id: 'string',
    client,
  })
  return response
}

describe('Testing meta.internal_get_api_token_for_discord_user', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
