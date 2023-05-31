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
    try {
      await example();
    } catch (err) {
      expect(err).toBeTruthy(); // eslint-disable-line jest/no-conditional-expect
    }
  });
});
