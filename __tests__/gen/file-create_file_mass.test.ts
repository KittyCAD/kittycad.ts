import { file, Client, ApiError } from '../../src/index.js'
import fsp from 'fs/promises'

const client = new Client()

async function example() {
  const response = await file.create_file_mass({
    material_density: 7,
    material_density_unit: 'lb:ft3',
    output_unit: 'kg',
    src_format: 'obj',
    body: await fsp.readFile('./example.obj', 'base64'),
    client,
  })
  return response
}

describe('Testing file.create_file_mass', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
