import { file, Client, ApiError } from '../../src/index.js'
import fsp from 'fs/promises'

const client = new Client()

async function example() {
  const response = await file.create_file_density({
    src_format: 'obj',
    material_mass: 7,
    material_mass_unit: 'g',
    output_unit: 'kg:m3',
    body: await fsp.readFile('./example.obj', 'base64'),
    client,
  })
  return response
}

describe('Testing file.create_file_density', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
