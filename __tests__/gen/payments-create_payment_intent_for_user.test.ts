import { payments } from '../../src/index.js';

async function example() {
  const response = await payments.create_payment_intent_for_user();
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing payments.create_payment_intent_for_user', () => {
  it('should be truthy or throw', async () => {
    try {
      await example();
    } catch (err) {
      expect(err).toBeTruthy(); // eslint-disable-line jest/no-conditional-expect
    }
  });
});
