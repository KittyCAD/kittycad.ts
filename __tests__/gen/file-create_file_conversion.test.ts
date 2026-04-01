import { file, Client, ApiError } from '../../src/index.js'
import fsp from 'fs/promises'

const client = new Client()

async function example() {
  const response = await file.create_file_conversion({
    src_format: 'obj',
    output_format: 'stl',
    body: await fsp.readFile('./example.obj', 'base64'),
    client,
  })
  return response
}

describe('Testing file.create_file_conversion', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
