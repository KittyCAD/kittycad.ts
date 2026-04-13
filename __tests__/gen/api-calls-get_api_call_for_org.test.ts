import { api_calls, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await api_calls.get_api_call_for_org({
    id: 'string',
    client,
  })
  return response
}

describe('Testing api_calls.get_api_call_for_org', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
