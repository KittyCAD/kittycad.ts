import { ml, ApiError } from '../../src/index.js'

async function example() {
  const response = await ml.create_text_to_cad_model_feedback({
    id: 'string',
    feedback: 'thumbs_up',
  })
  return response
}

describe('Testing ml.create_text_to_cad_model_feedback', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
