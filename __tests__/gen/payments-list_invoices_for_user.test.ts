import { payments } from '../../src/index.js';

async function example() {
  const response = await payments.list_invoices_for_user();
  if ('error_code' in response) throw 'error';

  return response;
}

describe('Testing payments.list_invoices_for_user', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
