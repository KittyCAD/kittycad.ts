import { meta, ApiError } from '../../src/index.js'

async function example() {
  const response = await meta.community_sso({ sig: 'string', sso: 'string' })
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
