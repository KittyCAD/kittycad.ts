import fsp from 'fs/promises'
import { ApiError, Client, file } from '../src/index.js'

const client = new Client(null)

async function assertCreateFileMass(
  params: Parameters<typeof file.create_file_mass>[0]
) {
  try {
    const response = await file.create_file_mass(params)
    if ('error_code' in response)
      throw new Error('error' + JSON.stringify(response))

    const { status, mass } = response
    expect(status).toBe('completed')
    expect(mass).toBe(1.0375403388552853e-7)
  } catch (err) {
    expect(err).toBeInstanceOf(ApiError)
  }
}

describe('Testing create_file_mass', () => {
  it("shouldn't throw", async () => {
    await assertCreateFileMass({
      src_format: 'obj',
      material_density_unit: 'kg:m3',
      output_unit: 'g',
      material_density: 0.007,
      body: await fsp.readFile('./example.obj', 'base64'),
    })
  })
  it("shouldn't throw when using a client", async () => {
    await assertCreateFileMass({
      client,
      src_format: 'obj',
      material_density_unit: 'kg:m3',
      output_unit: 'g',
      material_density: 0.007,
      body: await fsp.readFile('./example.obj', 'base64'),
    })
  })
})
