import { users } from '../../src/index.js';

async function example() {
  const response = await users.get_user_shortlinks({
    limit: 7,
    page_token: 'string',
    sort_by: 'created_at_ascending',
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing users.get_user_shortlinks', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
