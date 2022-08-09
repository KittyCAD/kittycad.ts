import { oauth2 } from '../../src/index.js';

async function example() {
  const response = await oauth2.listen_oauth2_provider_callback({
    provider: 'google',
    code: 'string',
    state: 'string',
  });
  if ('error_code' in response) throw 'error';

  return response;
}

describe('Testing oauth2.listen_oauth2_provider_callback', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
