import { file } from '../../src/index.js';

async function example() {
  const response = await file.get_file_conversion({ id: 'string' });
  if ('error_code' in response) throw 'error';

  return response;
}

describe('Testing file.get_file_conversion', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});