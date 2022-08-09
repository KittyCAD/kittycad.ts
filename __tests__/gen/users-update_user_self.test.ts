import { users } from '../../src/index.js';

async function example() {
  const response = await users.update_user_self();
  if ('error_code' in response) throw 'error';
  console.log(JSON.stringify(response, null, 2));
  return response;
}

describe('Testing users.update_user_self', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
