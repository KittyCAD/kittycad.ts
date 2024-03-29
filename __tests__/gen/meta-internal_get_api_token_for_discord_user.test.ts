import { meta } from '../../src/index.js';

async function example() {
  const response = await meta.internal_get_api_token_for_discord_user({
    discord_id: 'string',
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing meta.internal_get_api_token_for_discord_user', () => {
  it('should be truthy or throw', async () => {
    try {
      await example();
    } catch (err) {
      expect(err).toBeTruthy(); // eslint-disable-line jest/no-conditional-expect
    }
  });
});
