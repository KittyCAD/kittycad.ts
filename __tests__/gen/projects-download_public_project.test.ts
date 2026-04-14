import { projects, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await projects.download_public_project({
    id: '00000000-0000-0000-0000-000000000000',
    format: 'tar',
    client,
  })
  return response
}

describe('Testing projects.download_public_project', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
