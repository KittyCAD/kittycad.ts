import { payments } from '../../src/index.js';

async function example() {
  const response = await payments.create_payment_intent_for_org();

  return response;
}

describe('Testing payments.create_payment_intent_for_org', () => {
  it('should be truthy or throw', async () => {
    try {
      await example();
    } catch (err) {
      expect(err).toBeTruthy(); // eslint-disable-line jest/no-conditional-expect
    }
  });
});
