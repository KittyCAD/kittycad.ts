import { meta } from '../../src/index.js';

async function example() {
  const response = await meta.get_openai_schema();
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing meta.get_openai_schema', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
