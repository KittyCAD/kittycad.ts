import { file, Client, ApiError } from '@kittycad/lib'
import fsp from 'fs/promises'

const client = new Client()

async function example() {
  const response = await file.create_file_volume({
    src_format: 'obj',
    output_unit: 'ft3',
    body: await fsp.readFile('./example.obj', 'base64'),
    client,
  })
  return response
}

describe('Testing file.create_file_volume', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
