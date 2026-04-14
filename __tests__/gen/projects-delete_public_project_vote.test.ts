import { projects, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await projects.delete_public_project_vote({
    id: '00000000-0000-0000-0000-000000000000',
    client,
  })
  return response
}

describe('Testing projects.delete_public_project_vote', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
