import { oauth2 } from '../../src/index.js';

async function example() {
  const response = await oauth2.device_auth_verify({ user_code: 'string' });
  if ('error_code' in response) throw 'error';

  return response;
}

describe('Testing oauth2.device_auth_verify', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});