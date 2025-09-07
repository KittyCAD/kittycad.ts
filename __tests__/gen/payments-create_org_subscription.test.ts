import { payments, ApiError } from '../../src/index.js';

async function example() {
  const response = await payments.create_org_subscription({
    body: { modeling_app: 'team', pay_annually: true },
  });
  return response;
}

describe('Testing payments.create_org_subscription', () => {
  it('should be truthy or throw', async () => {
    try {
      await example();
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError);
    }
  });
});
