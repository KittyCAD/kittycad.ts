import { file, Client } from '../src/index.js';
import fsp from 'fs/promises';

const client = new Client(null);

describe('Testing create_file_mass', () => {
  it("shouldn't throw", async () => {
    const response = await file.create_file_mass({
      src_format: 'obj',
      material_density_unit: 'kg:m3',
      output_unit: 'g',
      material_density: 0.007,
      body: await fsp.readFile('./example.obj', 'base64'),
    });
    if ('error_code' in response) throw 'error' + JSON.stringify(response);

    const { status, mass } = response;
    console.log(mass);
    expect(status).toBe('completed');
    expect(mass).toBe(1.0375403388552853e-7);
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
    if ('error_code' in response) throw 'error' + JSON.stringify(response);

    const { status, mass } = response;
    expect(status).toBe('completed');
    expect(mass).toBe(1.0375403388552853e-7);
  });
});
