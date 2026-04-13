import { ml, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await ml.get_text_to_cad_part_for_user({
    id: 'string',
    client,
  })
  return response
}

describe('Testing ml.get_text_to_cad_part_for_user', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
