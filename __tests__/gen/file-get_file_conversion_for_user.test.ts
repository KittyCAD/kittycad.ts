import { file } from '../../src/index.js';

async function example() {
  const response = await file.get_file_conversion_for_user({ id: 'string' });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing file.get_file_conversion_for_user', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
