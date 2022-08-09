import { api_calls } from '../../src/index.js';

async function example() {
  const response = await api_calls.list_api_calls_for_user({ id: 'string', limit: 7, page_token: 'string', sort_by: 'created-at-ascending' });
  if ('error_code' in response) throw 'error';
  console.log(JSON.stringify(response, null, 2));
  return response;
}

describe('Testing api_calls.list_api_calls_for_user', () => {
  it('should be truthy or throw', async () => {
    try {
      const result = await example();
      expect(result).toBeTruthy();
    } catch (err) {
      expect(err).toBe(''); // eslint-disable-line jest/no-conditional-expect
    }
  });
});
