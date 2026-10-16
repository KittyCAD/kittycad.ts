import { projects, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await projects.delete_project_library({
    id: '00000000-0000-0000-0000-000000000000',
    expected_revision: 'string',
    client,
  })
  return response
}

describe('Testing projects.delete_project_library', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
