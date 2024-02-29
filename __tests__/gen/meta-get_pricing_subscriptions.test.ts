import { meta } from '../../src/index.js';

async function example() {
  const response = await meta.get_pricing_subscriptions();
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing meta.get_pricing_subscriptions', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
