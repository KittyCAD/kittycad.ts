import { users, ApiError } from '../../src/index.js'

async function example() {
  const response = await users.get_user_extended({ id: '31337' })
  return response
}

describe('Testing users.get_user_extended', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
