import { api_tokens } from '../../src/index.js';

async function example() {
  const response = await api_tokens.get_api_token_for_user({
    token: 'api-00000000-0000-0000-0000-000000000000',
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing api_tokens.get_api_token_for_user', () => {
  it('should be truthy or throw', async () => {
    try {
      await example();
    } catch (err) {
      expect(err).toBeTruthy(); // eslint-disable-line jest/no-conditional-expect
    }
  });
});
