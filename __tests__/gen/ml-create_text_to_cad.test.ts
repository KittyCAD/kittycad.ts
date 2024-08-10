import { ml } from '../../src/index.js';

async function example() {
  const response = await ml.create_text_to_cad({
    output_format: 'stl',
    kcl: true,
    body: { prompt: 'The prompt for the model.' },
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing ml.create_text_to_cad', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
