import { projects, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await projects.list_public_projects({ client })
  return response
}

describe('Testing projects.list_public_projects', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
