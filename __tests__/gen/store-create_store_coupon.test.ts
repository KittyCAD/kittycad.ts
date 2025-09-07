import { store } from '../../src/index.js';

async function example() {
  const response = await store.create_store_coupon({
    body: { percent_off: 7 },
  });

  return response;
}

describe('Testing store.create_store_coupon', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
