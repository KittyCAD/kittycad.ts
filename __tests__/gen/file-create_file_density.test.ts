import { file } from '../../src/index.js';

async function example() {
  const response = await file.create_file_density({ material_mass: 7, src_format: 'stl', body: 'base64 encoded string' });
  if ('error_code' in response) throw 'error';
  console.log(JSON.stringify(response, null, 2));
  return response;
}

describe('Testing file.create_file_density', () => {
  it('should be truthy or throw', async () => {
    try {
      const result = await example();
      expect(result).toBeTruthy();
    } catch (err) {
      expect(err).toBe(''); // eslint-disable-line jest/no-conditional-expect
    }
  });
});
