import { projects, Client, ApiError } from '../../src/index.js'

const client = new Client()

async function example() {
  const response = await projects.list_projects({ client })
  return response
}

describe('Testing projects.list_projects', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
