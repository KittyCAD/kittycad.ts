import { ml, ApiError } from '../../src/index.js'

async function example() {
  const response = await ml.get_text_to_cad_parts_for_user({ id: 'string' })
  return response
}

describe('Testing ml.get_text_to_cad_parts_for_user', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
