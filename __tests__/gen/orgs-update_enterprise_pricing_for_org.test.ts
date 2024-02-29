import { orgs } from '../../src/index.js';

async function example() {
  const response = await orgs.update_enterprise_pricing_for_org({
    id: '00000000-0000-0000-0000-000000000000',
    body: { interval: 'day', price: 7, type: 'flat' },
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing orgs.update_enterprise_pricing_for_org', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
