import { api_calls } from '../../src/index.js';

async function example() {
  const response = await api_calls.list_api_calls_for_user({
    id: 'string',
    limit: 7,
    page_token: 'string',
    sort_by: 'created-at-ascending',
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing api_calls.list_api_calls_for_user', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
