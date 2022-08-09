import { file } from '../src/index.js';
import fsp from 'fs/promises';

describe('Testing create_file_mass', () => {
  it("shouldn't throw", async () => {
    const response = await file.create_file_mass({
      src_format: 'obj',
      material_density: 0.007,
      body: await fsp.readFile('./example.obj', 'base64'),
    });
    if ('error_code' in response) throw 'error';

    const { status, mass } = response;
    expect(mass).toBe(0.7063786);
    expect(status).toBe('Completed');
  });
});
