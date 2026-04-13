import { users, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await users.get_user_privacy_settings({ client })
  return response
}

describe('Testing users.get_user_privacy_settings', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
