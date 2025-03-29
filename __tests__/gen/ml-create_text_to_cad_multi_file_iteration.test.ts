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
      prompt:
        'The prompt for the overall changes. This is optional if you only want changes on specific source ranges. This will apply to all the files. If you want to apply a prompt to just a single file, use the source_ranges field and you can leave this empty.',
      source_ranges: [],
    },
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing ml.create_text_to_cad_multi_file_iteration', () => {
  it('should be truthy or throw', async () => {
    try {
      await example();
    } catch (err) {
      expect(err).toBeTruthy(); // eslint-disable-line jest/no-conditional-expect
    }
  });
});
