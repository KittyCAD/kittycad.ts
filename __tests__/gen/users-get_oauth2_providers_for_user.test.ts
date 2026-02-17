import { users, ApiError } from '../../src/index.js'

async function example() {
  const response = await users.get_oauth2_providers_for_user()
  return response
}

describe('Testing users.get_oauth2_providers_for_user', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
