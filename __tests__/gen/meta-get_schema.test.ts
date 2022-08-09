import { meta } from '../../src/index.js';

async function example() {
  const response = await meta.get_schema();
  if ('error_code' in response) throw 'error';

  return response;
}

describe('Testing meta.get_schema', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
