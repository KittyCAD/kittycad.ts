import fsp from 'fs/promises';
import { file } from '../../src/index.js';

async function example() {
  const response = await file.create_file_conversion({
    output_format: 'stl',
    src_format: 'obj',
    body: await fsp.readFile('./example.obj', 'base64'),
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing file.create_file_conversion', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
