import { api_calls, ApiError } from '../../src/index.js';

async function example() {
  const response = await api_calls.list_api_calls({
    limit: 7,
    page_token: 'string',
    sort_by: 'created_at_ascending',
  });
  return response;
}

describe('Testing api_calls.list_api_calls', () => {
  it('should be truthy or throw', async () => {
    try {
      await example();
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError);
    }
  });
});
