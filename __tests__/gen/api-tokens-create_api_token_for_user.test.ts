import { api_tokens, ApiError } from '../../src/index.js'

async function example() {
  const response = await api_tokens.create_api_token_for_user({
    label: 'string',
  })
  return response
}

describe('Testing api_tokens.create_api_token_for_user', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
