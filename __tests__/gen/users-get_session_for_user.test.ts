import { users, ApiError } from '../../src/index.js';

async function example() {
  const response = await users.get_session_for_user({
    token: 'ses-00000000-0000-0000-0000-000000000000',
  });

  return response;
}

describe('Testing users.get_session_for_user', () => {
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
