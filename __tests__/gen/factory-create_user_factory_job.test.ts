import { factory, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await factory.create_user_factory_job({
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

describe('Testing factory.create_user_factory_job', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
