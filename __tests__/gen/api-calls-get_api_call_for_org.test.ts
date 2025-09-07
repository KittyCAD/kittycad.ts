import { api_calls, ApiError } from '../../src/index.js'

async function example() {
  const response = await api_calls.get_api_call_for_org({ id: 'string' })
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
