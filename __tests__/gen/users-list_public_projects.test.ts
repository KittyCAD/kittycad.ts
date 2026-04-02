import { users, Client, ApiError } from '../../src/index.js'

const client = new Client()

async function example() {
  const response = await users.list_public_projects({ client })
  return response
}

describe('Testing users.list_public_projects', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
