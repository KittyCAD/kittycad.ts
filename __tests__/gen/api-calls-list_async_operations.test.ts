import { api_calls } from '../../src/index.js';

async function example() {
  const response = await api_calls.list_async_operations({
    limit: 7,
    page_token: 'string',
    sort_by: 'created-at-ascending',
    status: 'Queued',
  });
  if ('error_code' in response) throw 'error';

  return response;
}

describe('Testing api_calls.list_async_operations', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
