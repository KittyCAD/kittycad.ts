import { payments } from '../../src/index.js';

async function example() {
  const response = await payments.get_payment_information_for_org();
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing payments.get_payment_information_for_org', () => {
  it('should be truthy or throw', async () => {
    try {
      await example();
    } catch (err) {
      expect(err).toBeTruthy(); // eslint-disable-line jest/no-conditional-expect
    }
  });
});
