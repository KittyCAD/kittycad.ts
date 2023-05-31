import { meta } from '../../src/index.js';

async function example() {
  const response = await meta.get_metadata();
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing meta.get_metadata', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
