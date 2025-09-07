import { payments, ApiError } from '../../src/index.js';

async function example() {
  const response = await payments.list_payment_methods_for_user();
  return response;
}

describe('Testing payments.list_payment_methods_for_user', () => {
  it('should be truthy or throw', async () => {
    try {
      await example();
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError);
    }
  });
});
