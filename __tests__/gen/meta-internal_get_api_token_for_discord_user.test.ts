import { meta, ApiError } from '../../src/index.js';

async function example() {
  const response = await meta.internal_get_api_token_for_discord_user({
    discord_id: 'string',
  });

  return response;
}

describe('Testing meta.internal_get_api_token_for_discord_user', () => {
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
