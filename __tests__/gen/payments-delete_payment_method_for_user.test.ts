import { payments } from '../../src/index.js';

async function example() {
  const response = await payments.delete_payment_method_for_user({
    id: 'string',
  });
  if ('error_code' in response) throw 'error';

  return response;
}

describe('Testing payments.delete_payment_method_for_user', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
