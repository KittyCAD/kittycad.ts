import { oauth2, ApiError } from '../../src/index.js';

async function example() {
  const response = await oauth2.oauth2_provider_callback({
    provider: 'apple',
    code: 'string',
    id_token: 'string',
    state: 'string',
    user: 'string',
  });

  return response;
}

describe('Testing oauth2.oauth2_provider_callback', () => {
  it('should be truthy or throw', async () => {
    try {
      await example();
    } catch (err) {
      // Only present in tests expected to throw
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      expect(err).toBeInstanceOf(ApiError);
    }
  });
});
