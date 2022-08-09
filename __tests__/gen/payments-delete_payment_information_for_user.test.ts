import { payments } from '../../src/index.js';

async function example() {
  const response = await payments.delete_payment_information_for_user();
  if ('error_code' in response) throw 'error';
  console.log(JSON.stringify(response, null, 2));
  return response;
}

describe('Testing payments.delete_payment_information_for_user', () => {
  it('should be truthy or throw', async () => {
    try {
      const result = await example();
      expect(result).toBeTruthy();
    } catch (err) {
      expect(err).toBe(''); // eslint-disable-line jest/no-conditional-expect
    }
  });
});
