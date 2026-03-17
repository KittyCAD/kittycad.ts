import { file, Client, ApiError } from '../../src/index.js'

const client = new Client()

async function example() {
  const response = await file.create_file_conversion_options({
    files: [
      {
        name: 'thing.kcl',
        data: new Blob(['thing = 1'], { type: 'text/plain' }),
      },
    ],
    body: {
      output_format: {
        created: 'Timestamp override.',
        storage: 'ascii',
        type: 'fbx',
      },
      src_format: { type: 'fbx' },
    },
    client,
  })
  return response
}

describe('Testing file.create_file_conversion_options', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
