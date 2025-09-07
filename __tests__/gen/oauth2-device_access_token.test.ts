import { oauth2, ApiError } from '../../src/index.js';

async function example() {
  const response = await oauth2.device_access_token();
  return response;
}

describe('Testing oauth2.device_access_token', () => {
  it('should be truthy or throw', async () => {
    try {
      await example();
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError);
    }
  });
});
