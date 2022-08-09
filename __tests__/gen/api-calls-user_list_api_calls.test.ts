import { api_calls } from '../../src/index.js';

async function example() {
  const response = await api_calls.user_list_api_calls({
    limit: 7,
    page_token: 'string',
    sort_by: 'created-at-ascending',
  });
  if ('error_code' in response) throw 'error';
  console.log(JSON.stringify(response, null, 2));
  return response;
}

describe('Testing api_calls.user_list_api_calls', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
