import { users } from '../../src/index.js';

async function example() {
  const response = await users.list_users_extended({ limit: 7, page_token: 'string', sort_by: 'created-at-ascending' });
  if ('error_code' in response) throw 'error';
  console.log(JSON.stringify(response, null, 2));
  return response;
}

describe('Testing users.list_users_extended', () => {
  it('should be truthy or throw', async () => {
    try {
      const result = await example();
      expect(result).toBeTruthy();
    } catch (err) {
      expect(err).toBe('error'); // eslint-disable-line jest/no-conditional-expect
    }
  });
});
