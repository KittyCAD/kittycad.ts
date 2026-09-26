import { factory, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await factory.get_user_factory_job({
    job_id: '00000000-0000-0000-0000-000000000000',
    client,
  })
  return response
}

describe('Testing factory.get_user_factory_job', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
