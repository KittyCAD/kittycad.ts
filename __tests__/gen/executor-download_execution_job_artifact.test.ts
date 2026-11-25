import { executor, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await executor.download_execution_job_artifact({
    id: '00000000-0000-0000-0000-000000000000',
    artifact_id: '00000000-0000-0000-0000-000000000000',
    client,
  })
  return response
}

describe('Testing executor.download_execution_job_artifact', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
