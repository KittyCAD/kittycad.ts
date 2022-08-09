import { api_calls } from '../../src/index.js';

async function example() {
  const response = await api_calls.list_async_operations({
    limit: 7,
    page_token: 'string',
    sort_by: 'created-at-ascending',
    status: 'Queued',
  });
  if ('error_code' in response) throw 'error';
  console.log(JSON.stringify(response, null, 2));
  return response;
}

describe('Testing api_calls.list_async_operations', () => {
  it('should be truthy or throw', async () => {
    try {
      const result = await example();
      expect(result).toBeTruthy();
    } catch (err) {
      expect(err).toBe('error'); // eslint-disable-line jest/no-conditional-expect
    }
  });
});
