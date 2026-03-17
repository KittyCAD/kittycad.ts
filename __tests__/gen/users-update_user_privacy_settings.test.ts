import { users, Client, ApiError } from '../../src/index.js'

const client = new Client()

async function example() {
  const response = await users.update_user_privacy_settings({
    body: { can_train_on_data: true },
    client,
  })
  return response
}

describe('Testing users.update_user_privacy_settings', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
