import { ApiError, api_calls } from '../../src/index.js'

async function example() {
  const response = await api_calls.list_api_calls_for_user({
    id: '31337',
    limit: 7,
    page_token: 'string',
    sort_by: 'created_at_ascending',
  })
  return response
}

describe('Testing api_calls.list_api_calls_for_user', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
