import { ml } from '../../src/index.js';

async function example() {
  const response = await ml.create_text_to_cad_iteration({
    body: {
      original_source_code:
        'The source code for the model (in kcl) that is to be edited.',
      prompt: 'The prompt for the model, if not using source ranges.',
      source_ranges: [],
    },
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing ml.create_text_to_cad_iteration', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
