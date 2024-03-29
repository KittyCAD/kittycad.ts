import { oauth2 } from '../../src/index.js';

async function example() {
  const response = await oauth2.device_auth_request();
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing oauth2.device_auth_request', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
