import { executor, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await executor.list_execution_job_artifacts({
    id: '00000000-0000-0000-0000-000000000000',
    limit: 7,
    page_token: 'string',
    sort_by: 'id_ascending',
    client,
  })
  return response
}

describe('Testing executor.list_execution_job_artifacts', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
