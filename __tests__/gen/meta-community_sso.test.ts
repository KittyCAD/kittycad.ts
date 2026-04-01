import { meta, Client, ApiError } from '../../src/index.js'

const client = new Client()

async function example() {
  const response = await meta.community_sso({
    sso: 'string',
    sig: 'string',
    client,
  })
  return response
}

describe('Testing meta.community_sso', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
