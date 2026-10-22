import { projects, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await projects.rename_project_library({
    id: '00000000-0000-0000-0000-000000000000',
    body: {
      expected_revision: 'Revision returned by the last library read.',
      name: 'New display name.',
    },
    client,
  })
  return response
}

describe('Testing projects.rename_project_library', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
