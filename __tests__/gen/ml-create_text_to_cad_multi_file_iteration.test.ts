import { ml } from '../../src/index.js';

async function example() {
  const response = await ml.create_text_to_cad_multi_file_iteration({
    files: [
      {
        name: 'thing.kcl',
        data: new Blob(['thing = 1'], { type: 'text/plain' }),
      },
    ],
    body: {
      kcl_version:
        'The version of kcl to use. If empty, the latest version will be used.',
      project_name:
        'The project name. This is used to tie the prompt to a project. Which helps us make our models better over time.',
      source_ranges: [],
    },
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing ml.create_text_to_cad_multi_file_iteration', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
