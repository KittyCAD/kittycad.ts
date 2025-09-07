import { file } from '../../src/index.js';
import fsp from 'fs/promises';

async function example() {
  const response = await file.create_file_volume({
    output_unit: 'ft3',
    src_format: 'obj',
    body: await fsp.readFile('./example.obj', 'base64'),
  });
  return response;
}

describe('Testing file.create_file_volume', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
