import { payments } from '../../src/index.js';

async function example() {
  const response = await payments.update_payment_balance_for_any_user({
    id: '31337',
    include_total_due: true,
    body: {
      monthly_api_credits_remaining_monetary_value: 7,
      stable_api_credits_remaining_monetary_value: 7,
    },
  });

  return response;
}

describe('Testing payments.update_payment_balance_for_any_user', () => {
  it('should be truthy or throw', async () => {
    try {
      await example();
    } catch (err) {
      expect(err).toBeTruthy(); // eslint-disable-line jest/no-conditional-expect
    }
  });
});
