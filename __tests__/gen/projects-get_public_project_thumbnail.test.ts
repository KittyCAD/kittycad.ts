import { projects, Client, ApiError } from '../../src/index.js'

const client = new Client()

async function example() {
  const response = await projects.get_public_project_thumbnail({
    id: '00000000-0000-0000-0000-000000000000',
    client,
  })
  return response
}

describe('Testing projects.get_public_project_thumbnail', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
