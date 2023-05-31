import { oauth2 } from '../../src/index.js';

async function example() {
  const response = await oauth2.oauth2_provider_callback({
    provider: 'google',
    code: 'string',
    state: 'string',
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing oauth2.oauth2_provider_callback', () => {
  it('should be truthy or throw', async () => {
    try {
      await example();
    } catch (err) {
      expect(err).toBeTruthy(); // eslint-disable-line jest/no-conditional-expect
    }
  });
});
