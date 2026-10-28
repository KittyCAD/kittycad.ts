import { projects, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await projects.search_org_projects_semantic({
    body: {
      library_id: 'A UUID usually v4 or v7',
      limit: 7,
      q: 'Search text, limited to 2,048 characters after trimming whitespace.',
    },
    client,
  })
  return response
}

describe('Testing projects.search_org_projects_semantic', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
