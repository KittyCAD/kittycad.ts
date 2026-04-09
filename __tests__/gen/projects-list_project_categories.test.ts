import { projects, Client, ApiError } from '../../src/index.js'

const client = new Client()

async function example() {
  const response = await projects.list_project_categories({ client })
  return response
}

describe('Testing projects.list_project_categories', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
