import { api_tokens, Client, ApiError } from '../../src/index.js'

const client = new Client()

async function example() {
  const response = await api_tokens.create_api_token_for_user({
    label: 'string',
    client,
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
