import { ApiError, users } from '../../src/index.js'

async function example() {
  const response = await users.delete_user_shortlink({ key: 'string' })
  return response
}

describe('Testing users.delete_user_shortlink', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
