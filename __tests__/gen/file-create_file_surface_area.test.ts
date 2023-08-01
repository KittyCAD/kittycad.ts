import fsp from 'fs/promises';
import { file } from '../../src/index.js';

async function example() {
  const response = await file.create_file_surface_area({
    output_unit: 'dm2',
    src_format: 'obj',
    body: await fsp.readFile('./example.obj', 'base64'),
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing file.create_file_surface_area', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
