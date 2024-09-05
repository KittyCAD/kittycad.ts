import { oauth2 } from '../../src/index.js';

async function example() {
  const response = await oauth2.oauth2_token_revoke();
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing oauth2.oauth2_token_revoke', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
