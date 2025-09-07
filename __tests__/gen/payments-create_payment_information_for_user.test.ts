import { payments, ApiError } from '../../src/index.js';

async function example() {
  const response = await payments.create_payment_information_for_user({
    body: {
      address: {
        city: 'The city component.',
        country: 'An ISO-3166 alpha-2 country code. Always uppercase.',
        state: 'The state component.',
        street1: 'The first street component.',
        street2: 'The second street component.',
        zip: 'The zip component.',
      },
      name: 'The name of the customer.',
      phone: 'The phone for the customer.',
    },
  });

  return response;
}

describe('Testing payments.create_payment_information_for_user', () => {
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
