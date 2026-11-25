import { executor, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await executor.cancel_execution_job({
    id: '00000000-0000-0000-0000-000000000000',
    client,
  })
  return response
}

describe('Testing executor.cancel_execution_job', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
