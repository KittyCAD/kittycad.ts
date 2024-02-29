import { payments } from '../../src/index.js';

async function example() {
  const response = await payments.update_payment_balance_for_any_user({
    id: '00000000-0000-0000-0000-000000000000',
    body: {
      monthly_credits_remaining: 7,
      pre_pay_cash_remaining: 7,
      pre_pay_credits_remaining: 7,
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
