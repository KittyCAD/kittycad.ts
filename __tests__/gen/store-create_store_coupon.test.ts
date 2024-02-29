import { store } from '../../src/index.js';

async function example() {
  const response = await store.create_store_coupon({
    body: { percent_off: 7 },
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing store.create_store_coupon', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
