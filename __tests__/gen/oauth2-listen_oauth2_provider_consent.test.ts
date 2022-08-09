import { oauth2 } from '../../src/index.js';

async function example() {
  const response = await oauth2.listen_oauth2_provider_consent({ provider: 'google', callback_url: 'string' });
  if ('error_code' in response) throw 'error';
  console.log(JSON.stringify(response, null, 2));
  return response;
}

describe('Testing oauth2.listen_oauth2_provider_consent', () => {
  it('should be truthy or throw', async () => {
    try {
      const result = await example();
      expect(result).toBeTruthy();
    } catch (err) {
      expect(err).toBe(''); // eslint-disable-line jest/no-conditional-expect
    }
  });
});
