import { factory, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await factory.create_user_factory_job_version({
    files: [
      {
        name: 'thing.kcl',
        data: new Blob(['thing = 1'], { type: 'text/plain' }),
      },
    ],
    job_id: '00000000-0000-0000-0000-000000000000',
    client,
  })
  return response
}

describe('Testing factory.create_user_factory_job_version', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
