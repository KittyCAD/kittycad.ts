import { ml } from '../../src/index.js';

async function example() {
  const response = await ml.list_text_to_cad_models_for_user({
    limit: 7,
    page_token: 'string',
    sort_by: 'created_at_ascending',
    no_models: true,
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing ml.list_text_to_cad_models_for_user', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
