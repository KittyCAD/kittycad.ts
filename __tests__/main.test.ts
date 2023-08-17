import { file, Client } from '../src/index.js';
import fsp from 'fs/promises';

const client = new Client(process.env.KITTYCAD_TOKEN || '');

describe('Testing create_file_mass', () => {
  it("shouldn't throw", async () => {
    const response = await file.create_file_mass({
      src_format: 'obj',
      material_density_unit: 'kg:m3',
      output_unit: 'g',
      material_density: 0.007,
      body: await fsp.readFile('./example.obj', 'base64'),
    });
    if ('error_code' in response) throw 'error';

    const { status, mass } = response;
    expect(mass).toBe(103.75396340798275);
    expect(status).toBe('Completed');
  });
  it("shouldn't throw when using a client", async () => {
    const response = await file.create_file_mass({
      client,
      src_format: 'obj',
      material_density_unit: 'kg:m3',
      output_unit: 'g',
      material_density: 0.007,
      body: await fsp.readFile('./example.obj', 'base64'),
    });
    if ('error_code' in response) throw 'error';

    const { status, mass } = response;
    expect(mass).toBe(103.75396340798275);
    expect(status).toBe('Completed');
  });
});
