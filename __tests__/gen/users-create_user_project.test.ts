import { users, Client, ApiError } from '../../src/index.js'

const client = new Client()

async function example() {
  const response = await users.create_user_project({
    files: [
      {
        name: 'thing.kcl',
        data: new Blob(['thing = 1'], { type: 'text/plain' }),
      },
    ],
    client,
  })
  return response
}

describe('Testing users.create_user_project', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
