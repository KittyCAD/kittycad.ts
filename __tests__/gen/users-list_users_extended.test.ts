import { users } from '../../src/index.js';

async function example() {
  const response = await users.list_users_extended({
    limit: 7,
    page_token: 'string',
    sort_by: 'created_at_ascending',
  });

  return response;
}

describe('Testing users.list_users_extended', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
