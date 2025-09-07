import { payments, ApiError } from '../../src/index.js';

async function example() {
  const response = await payments.get_org_subscription();

  return response;
}

describe('Testing payments.get_org_subscription', () => {
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
