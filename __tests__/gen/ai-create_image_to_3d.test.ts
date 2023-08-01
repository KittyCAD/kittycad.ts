import fsp from 'fs/promises';
import { ai } from '../../src/index.js';

async function example() {
  const response = await ai.create_image_to_3d({
    input_format: 'jpg',
    output_format: 'stl',
    body: await fsp.readFile('./example', 'base64'),
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing ai.create_image_to_3d', () => {
  it('should be truthy or throw', async () => {
    const examplePromise = example();
    const timeoutPromise = new Promise((r) =>
      setTimeout(() => r('timeout'), 450),
    );
    expect(await Promise.any([examplePromise, timeoutPromise])).toBe('timeout');
  });
});
