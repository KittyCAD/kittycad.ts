import { users, Client, ApiError } from '../../src/index.js'

const client = new Client()

async function example() {
  const response = await users.delete_public_project_vote({
    id: '00000000-0000-0000-0000-000000000000',
    client,
  })
  return response
}

describe('Testing users.delete_public_project_vote', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
