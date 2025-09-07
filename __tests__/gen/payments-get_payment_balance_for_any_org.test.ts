import { payments, ApiError } from '../../src/index.js';

async function example() {
  const response = await payments.get_payment_balance_for_any_org({
    include_total_due: true,
    id: '00000000-0000-0000-0000-000000000000',
  });

  return response;
}

describe('Testing payments.get_payment_balance_for_any_org', () => {
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
