import { ml } from '../../src/index.js';

async function example() {
  const response = await ml.create_text_to_cad_multi_file_iteration();
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing ml.create_text_to_cad_multi_file_iteration', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
