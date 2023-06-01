import { ai } from '../../src/index.js';

async function example() {
  const response = await ai.create_text_to_3d({
    output_format: 'stl',
    prompt: 'string',
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing ai.create_text_to_3d', () => {
  it('should be truthy or throw', async () => {
    const examplePromise = example();
    const timeoutPromise = new Promise((r) =>
      setTimeout(() => r('timeout'), 450),
    );
    expect(await Promise.any([examplePromise, timeoutPromise])).toBe('timeout');
  });
});
