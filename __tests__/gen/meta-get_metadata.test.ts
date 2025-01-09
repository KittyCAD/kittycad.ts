import { meta } from '../../src/index.js';

async function example() {
  const response = await meta.get_metadata();
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing meta.get_metadata', () => {
  it('should be truthy or throw', async () => {
    const examplePromise = example();
    const timeoutPromise = new Promise((r) =>
      setTimeout(() => r('timeout'), 450),
    );
    expect(await Promise.any([examplePromise, timeoutPromise])).toBe('timeout');
  });
});
