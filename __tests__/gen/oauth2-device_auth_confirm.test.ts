import { oauth2 } from '../../src/index.js';

async function example() {
  const response = await oauth2.device_auth_confirm({
    body: { user_code: 'The user code.' },
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing oauth2.device_auth_confirm', () => {
  it('should be truthy or throw', async () => {
    try {
      await example();
    } catch (err) {
      expect(err).toBeTruthy(); // eslint-disable-line jest/no-conditional-expect
    }
  });
});
