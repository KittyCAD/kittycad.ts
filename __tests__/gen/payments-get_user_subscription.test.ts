import { payments, ApiError } from '../../src/index.js';

async function example() {
  const response = await payments.get_user_subscription();
  return response;
}

describe('Testing payments.get_user_subscription', () => {
  it('should be truthy or throw', async () => {
    try {
      await example();
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError);
    }
  });
});
