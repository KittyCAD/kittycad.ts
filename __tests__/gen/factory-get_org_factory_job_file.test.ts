import { factory, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await factory.get_org_factory_job_file({
    job_id: '00000000-0000-0000-0000-000000000000',
    file_id: '00000000-0000-0000-0000-000000000000',
    client,
  })
  return response
}

describe('Testing factory.get_org_factory_job_file', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
