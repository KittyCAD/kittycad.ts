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
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing payments.update_payment_balance_for_any_user', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
