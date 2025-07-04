import { users } from '../../src/index.js';

async function example() {
  const response = await users.put_public_subscribe({
    body: { email: 'The email' },
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing users.put_public_subscribe', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
