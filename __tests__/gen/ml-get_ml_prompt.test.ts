import { ml, Client, ApiError } from '../../src/index.js'

const client = new Client()

async function example() {
  const response = await ml.get_ml_prompt({ id: 'string', client })
  return response
}

describe('Testing ml.get_ml_prompt', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
