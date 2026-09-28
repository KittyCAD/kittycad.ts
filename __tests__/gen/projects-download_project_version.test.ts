import { projects, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await projects.download_project_version({
    id: '00000000-0000-0000-0000-000000000000',
    version_id: '00000000-0000-0000-0000-000000000000',
    format: 'tar',
    client,
  })
  return response
}

describe('Testing projects.download_project_version', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
