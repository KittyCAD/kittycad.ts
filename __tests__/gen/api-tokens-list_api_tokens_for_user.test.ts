import { api_tokens } from '../../src/index.js';

async function example() {
  const response = await api_tokens.list_api_tokens_for_user({
    limit: 7,
    page_token: 'string',
    sort_by: 'created_at_ascending',
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing api_tokens.list_api_tokens_for_user', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
