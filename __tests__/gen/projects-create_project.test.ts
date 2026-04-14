import { projects, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await projects.create_project({
    files: [
      {
        name: 'thing.kcl',
        data: new Blob(['thing = 1'], { type: 'text/plain' }),
      },
    ],
    client,
  })
  return response
}

describe('Testing projects.create_project', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
