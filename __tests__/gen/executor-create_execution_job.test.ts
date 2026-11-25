import { executor, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await executor.create_execution_job({
    idempotency_key: 'string',
    body: {
      command: ['string'],
      compute_profile_id: 'Pinned compute-profile catalog identifier.',
      environment: {},
      inputs: [],
      outputs: [],
      runtime_id: 'Pinned runtime catalog identifier.',
      timeout_seconds: 7,
    },
    client,
  })
  return response
}

describe('Testing executor.create_execution_job', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
