import { file } from '../../src/index.js';

async function example() {
  const response = await file.create_file_conversion_options({
    files: [
      {
        name: 'thing.kcl',
        data: new Blob(['thing = 1'], { type: 'text/plain' }),
      },
    ],
    body: {
      output_format: {
        created: 'Timestamp override.',
        storage: 'ascii',
        type: 'fbx',
      },
      src_format: { type: 'fbx' },
    },
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing file.create_file_conversion_options', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
