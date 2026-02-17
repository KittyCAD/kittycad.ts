import { api_calls, ApiError } from '../../src/index.js'

async function example() {
  const response = await api_calls.get_api_call_metrics({ group_by: 'email' })
  return response
}

describe('Testing api_calls.get_api_call_metrics', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
