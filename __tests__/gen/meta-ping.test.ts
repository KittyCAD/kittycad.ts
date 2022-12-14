import { meta } from '../../src/index.js';

async function example() {
  const response = await meta.ping();
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing meta.ping', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
