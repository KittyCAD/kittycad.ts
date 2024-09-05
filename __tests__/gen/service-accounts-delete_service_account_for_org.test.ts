import { service_accounts } from '../../src/index.js';

async function example() {
  const response = await service_accounts.delete_service_account_for_org({
    token: 'svc-00000000-0000-0000-0000-000000000000',
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing service_accounts.delete_service_account_for_org', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
