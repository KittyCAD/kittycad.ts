import { file, ApiError } from '../../src/index.js'
import fsp from 'fs/promises'

async function example() {
  const response = await file.create_file_center_of_mass({
    output_unit: 'ft',
    src_format: 'obj',
    body: await fsp.readFile('./example.obj', 'base64'),
  })
  return response
}

describe('Testing file.create_file_center_of_mass', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
