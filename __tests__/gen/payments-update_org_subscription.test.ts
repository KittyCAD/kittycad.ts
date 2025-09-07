import { payments, ApiError } from '../../src/index.js';

async function example() {
  const response = await payments.update_org_subscription({
    body: { modeling_app: 'team', pay_annually: true },
  });

  return response;
}

describe('Testing payments.update_org_subscription', () => {
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
