import { payments } from '../../src/index.js';

async function example() {
  const response = await payments.update_payment_information_for_user();
  if ('error_code' in response) throw 'error';
  console.log(JSON.stringify(response, null, 2));
  return response;
}

describe('Testing payments.update_payment_information_for_user', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
