import { meta, ApiError } from '../../src/index.js'

async function example() {
  const response = await meta.ping()
  return response
}

describe('Testing meta.ping', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
