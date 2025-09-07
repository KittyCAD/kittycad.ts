import { ml, ApiError } from '../../src/index.js'

async function example() {
  const response = await ml.list_text_to_cad_models_for_user({
    limit: 7,
    page_token: 'string',
    sort_by: 'created_at_ascending',
    conversation_id: '00000000-0000-0000-0000-000000000000',
    no_models: true,
  })
  return response
}

describe('Testing ml.list_text_to_cad_models_for_user', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
