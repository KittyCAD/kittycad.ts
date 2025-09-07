import { payments, ApiError } from '../../src/index.js';

async function example() {
  const response = await payments.validate_customer_tax_information_for_org();
  return response;
}

describe('Testing payments.validate_customer_tax_information_for_org', () => {
  it('should be truthy or throw', async () => {
    try {
      await example();
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError);
    }
  });
});
