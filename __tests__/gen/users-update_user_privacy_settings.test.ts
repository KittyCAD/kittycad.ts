import { users, ApiError } from '../../src/index.js'

async function example() {
  const response = await users.update_user_privacy_settings({
    body: { can_train_on_data: true },
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
