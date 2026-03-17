import { meta, Client, ApiError } from '../../src/index.js'

const client = new Client()

async function example() {
  const response = await meta.create_debug_uploads({
    files: [
      {
        name: 'thing.kcl',
        data: new Blob(['thing = 1'], { type: 'text/plain' }),
      },
    ],
    client,
  })
  return response
}

describe('Testing meta.create_debug_uploads', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
