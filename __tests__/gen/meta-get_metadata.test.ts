import { meta } from '../../src/index.js';

async function example() {
  const response = await meta.get_metadata();
  if ('error_code' in response) throw 'error';
  console.log(JSON.stringify(response, null, 2));
  return response;
}

describe('Testing meta.get_metadata', () => {
  it('should be truthy or throw', async () => {
    try {
      const result = await example();
      expect(result).toBeTruthy();
    } catch (err) {
      expect(err).toBe('error'); // eslint-disable-line jest/no-conditional-expect
    }
  });
});
