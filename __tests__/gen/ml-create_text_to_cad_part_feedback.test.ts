import { ml, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await ml.create_text_to_cad_part_feedback({
    id: 'string',
    feedback: 'thumbs_up',
    client,
  })
  return response
}

describe('Testing ml.create_text_to_cad_part_feedback', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
