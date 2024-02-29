import { meta } from '../../src/index.js';

async function example() {
  const response = await meta.create_event();
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing meta.create_event', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
