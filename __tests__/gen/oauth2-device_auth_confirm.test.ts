import { oauth2, ApiError } from '../../src/index.js';

async function example() {
  const response = await oauth2.device_auth_confirm({
    body: { user_code: 'The user code.' },
  });

  return response;
}

describe('Testing oauth2.device_auth_confirm', () => {
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
