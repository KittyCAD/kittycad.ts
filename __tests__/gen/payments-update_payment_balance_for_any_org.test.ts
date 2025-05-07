import { payments } from '../../src/index.js';

async function example() {
  const response = await payments.update_payment_balance_for_any_org({
    id: '00000000-0000-0000-0000-000000000000',
    include_total_due: true,
    body: {
      monthly_api_credits_remaining_monetary_value: 7,
      stable_api_credits_remaining_monetary_value: 7,
    },
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing payments.update_payment_balance_for_any_org', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
