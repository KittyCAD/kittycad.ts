import { payments } from '../../src/index.js';

async function example() {
  const response = await payments.create_user_subscription({
    body: { modeling_app: 'free', pay_annually: true },
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing payments.create_user_subscription', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
