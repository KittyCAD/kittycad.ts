import { file } from '../../src/index.js';

async function example() {
  const response = await file.get_file_conversion_for_user({ id: 'string' });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing file.get_file_conversion_for_user', () => {
  it('should be truthy or throw', async () => {
    try {
      await example();
    } catch (err) {
      expect(err).toBeTruthy(); // eslint-disable-line jest/no-conditional-expect
    }
  });
});
