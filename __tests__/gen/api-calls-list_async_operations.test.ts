import { api_calls } from '../../src/index.js';

async function example() {
  const response = await api_calls.list_async_operations({
    limit: 7,
    page_token: 'string',
    sort_by: 'created_at_ascending',
    status: 'queued',
  });

  return response;
}

describe('Testing api_calls.list_async_operations', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
