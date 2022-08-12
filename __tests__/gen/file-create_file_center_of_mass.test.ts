import fsp from 'fs/promises';
import { file } from '../../src/index.js';

async function example() {
  const response = await file.create_file_center_of_mass({
    material_density: 7,
    src_format: 'obj',
    body: await fsp.readFile('./example.obj', 'base64'),
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing file.create_file_center_of_mass', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
