import { file } from '../../src/index.js';

async function example() {
  const response = await file.create_file_conversion({
    output_format: 'stl',
    src_format: 'stl',
    body: 'base64 encoded string',
  });
  if ('error_code' in response) throw 'error';

  return response;
}

describe('Testing file.create_file_conversion', () => {
  it('should be truthy or throw', async () => {
    try {
      await example();
    } catch (err) {
      expect(err).toBe('error'); // eslint-disable-line jest/no-conditional-expect
    }
  });
});