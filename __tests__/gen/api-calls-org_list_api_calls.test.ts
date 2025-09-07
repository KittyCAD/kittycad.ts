import { api_calls } from '../../src/index.js';

async function example() {
  const response = await api_calls.org_list_api_calls({
    limit: 7,
    page_token: 'string',
    sort_by: 'created_at_ascending',
  });

  return response;
}

describe('Testing api_calls.org_list_api_calls', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
