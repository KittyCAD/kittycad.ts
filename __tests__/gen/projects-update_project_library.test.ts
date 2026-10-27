import { projects, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await projects.update_project_library({
    id: '00000000-0000-0000-0000-000000000000',
    body: {
      expected_revision: 'Metadata revision returned by the last project read.',
      library_id: 'A UUID usually v4 or v7',
    },
    client,
  })
  return response
}

describe('Testing projects.update_project_library', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
