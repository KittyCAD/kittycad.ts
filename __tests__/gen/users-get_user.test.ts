import { users } from '../../src/index.js';

async function example() {
  const response = await users.get_user({ id: 'string' });
  if ('error_code' in response) throw 'error';

  return response;
}

describe('Testing users.get_user', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});