import { meta } from '../../src/index.js';

async function example() {
  const response = await meta.get_schema();

  return response;
}

describe('Testing meta.get_schema', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
