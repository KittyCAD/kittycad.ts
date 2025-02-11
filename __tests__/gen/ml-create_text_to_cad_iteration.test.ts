import { ml } from '../../src/index.js';

async function example() {
  const response = await ml.create_text_to_cad_iteration({
    body: {
      kcl_version:
        'The version of kcl to use. If empty, the latest version will be used.',
      original_source_code:
        'The source code for the model (in kcl) that is to be edited.',
      project_name:
        'The project name. This is used to tie the prompt to a project. Which helps us make our models better over time.',
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
