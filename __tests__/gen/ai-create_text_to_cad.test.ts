import { ai } from '../../src/index.js';

async function example() {
  const response = await ai.create_text_to_cad({
    output_format: 'stl',
    body: { prompt: 'The prompt for the model.' },
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing ai.create_text_to_cad', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
