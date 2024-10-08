import { ml } from '../../src/index.js';

async function example() {
  const response = await ml.list_ml_prompts({
    limit: 7,
    page_token: 'string',
    sort_by: 'created_at_ascending',
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing ml.list_ml_prompts', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
