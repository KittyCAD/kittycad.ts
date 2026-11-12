import { users, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await users.remove_user_avatar({ client })
  return response
}

describe('Testing users.remove_user_avatar', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
