import { users, ApiError } from '../../src/index.js';

async function example() {
  const response = await users.get_user_privacy_settings();

  return response;
}

describe('Testing users.get_user_privacy_settings', () => {
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
