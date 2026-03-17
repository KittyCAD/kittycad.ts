import { ml, Client, ApiError } from '../../src/index.js'

const client = new Client()

async function example() {
  const response = await ml.create_proprietary_to_kcl({
    files: [
      {
        name: 'thing.kcl',
        data: new Blob(['thing = 1'], { type: 'text/plain' }),
      },
    ],
    code_option: 'mock_execute',
    client,
  })
  return response
}

describe('Testing ml.create_proprietary_to_kcl', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
