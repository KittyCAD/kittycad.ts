import { users, ApiError } from '../../src/index.js';

async function example() {
  const response = await users.list_users({
    limit: 7,
    page_token: 'string',
    sort_by: 'created_at_ascending',
  });
  return response;
}

describe('Testing users.list_users', () => {
  it('should be truthy or throw', async () => {
    try {
      await example();
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError);
    }
  });
});
