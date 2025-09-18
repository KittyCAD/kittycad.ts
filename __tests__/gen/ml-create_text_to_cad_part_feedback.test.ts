import { ml } from '../../src/index.js'

async function example() {
  const response = await ml.create_text_to_cad_part_feedback({
    id: 'string',
    feedback: 'thumbs_up',
  })
  return response
}

describe('Testing ml.create_text_to_cad_part_feedback', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy()
  })
})
