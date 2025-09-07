import { payments, ApiError } from '../../src/index.js';

async function example() {
  const response = await payments.get_payment_balance_for_org({
    include_total_due: true,
  });
  return response;
}

describe('Testing payments.get_payment_balance_for_org', () => {
  it('should be truthy or throw', async () => {
    try {
      await example();
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError);
    }
  });
});
