import { projects, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await projects.create_project_library({
    body: { name: 'Display name for the library.', scope: 'personal' },
    client,
  })
  return response
}

describe('Testing projects.create_project_library', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
