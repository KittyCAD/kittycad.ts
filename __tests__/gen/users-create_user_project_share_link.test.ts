import { users, Client, ApiError } from '../../src/index.js'

const client = new Client()

async function example() {
  const response = await users.create_user_project_share_link({
    id: '00000000-0000-0000-0000-000000000000',
    body: { access_mode: 'anyone_with_link' },
    client,
  })
  return response
}

describe('Testing users.create_user_project_share_link', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
